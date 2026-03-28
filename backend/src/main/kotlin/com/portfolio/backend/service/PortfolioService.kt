package com.portfolio.backend.service

import com.portfolio.backend.models.Project
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class PortfolioService(private val restTemplate: RestTemplate) {

    @org.springframework.beans.factory.annotation.Value("\${github.token}")
    private lateinit var githubToken: String

    fun getGithubRepos(username: String): List<Project> {
        // Manuall examples for testing
        val exampleProjects = listOf(
            Project(
                name = "Example: Cloud Dashboard",
                description = "A demo project showing how I handle high-traffic infrastructure.",
                url = "https://github.com/noahbelstad",
                language = "Kotlin",
                previewUrl = "https://placehold.co/600x400?text=Cloud+Dashboard",
                languageBreakdown = mapOf("Kotlin" to 80.0, "Java" to 20.0)
            )
        )

        val headers = HttpHeaders().apply {
            set("Accept", "application/vnd.github+json")
            set("Authorization", "Bearer $githubToken")
            set("X-GitHub-Api-Version", "2022-11-28")
            set("User-Agent", "Spring-Boot-Portfolio")
        }
        val entity = HttpEntity<Unit>(headers)

        return try {
            val url = "https://api.github.com/users/$username/repos"
            val response = restTemplate.exchange(url, HttpMethod.GET, entity, Array<Project>::class.java)
            val fetchedProjects = response.body?.toList() ?: emptyList()

            fetchedProjects.forEach { project ->
                val repoName = project.name

                val mainUrl = "https://raw.githubusercontent.com/$username/$repoName/main/preview.png"
                val masterUrl = "https://raw.githubusercontent.com/$username/$repoName/master/preview.png"

                project.previewUrl = when {
                    checkImageExists(mainUrl, entity) -> mainUrl
                    checkImageExists(masterUrl, entity) -> masterUrl
                    else -> null
                }

                fetchLanguages(username, project, entity)
            }

            exampleProjects + fetchedProjects

        } catch (e: Exception) {
            println("GitHub API error: ${e.message}")
            exampleProjects
        }
    }

    private fun checkImageExists(url: String, entity: HttpEntity<Unit>): Boolean {
        return try {
            val response = restTemplate.exchange(url, HttpMethod.GET, entity, ByteArray::class.java)
            response.statusCode.is2xxSuccessful
        } catch (e: Exception) {
            false
        }
    }

    private fun fetchLanguages(username: String, project: Project, entity: HttpEntity<Unit>) {
        try {
            val langUrl = "https://api.github.com/repos/$username/${project.name}/languages"
            val langResponse = restTemplate.exchange(langUrl, HttpMethod.GET, entity, Map::class.java)
            val langMap = langResponse.body as? Map<String, Int>

            if (langMap != null && langMap.isNotEmpty()) {
                val totalBytes = langMap.values.sum().toDouble()
                project.languageBreakdown = langMap.mapValues { (_, bytes) ->
                    Math.round((bytes / totalBytes * 100) * 10.0) / 10.0
                }
            }
        } catch (e: Exception) {
            project.languageBreakdown = emptyMap()
        }
    }
}