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
        val url = "https://api.github.com/users/$username/repos"

        val headers = HttpHeaders().apply {
            set("Accept", "application/vnd.github+json")
            set("Authorization", "Bearer $githubToken")
            set("X-GitHub-Api-Version", "2022-11-28")
            set("User-Agent", "Spring-Boot-Portfolio")
        }

        val entity = HttpEntity<Unit>(headers)

        val response = restTemplate.exchange(url, HttpMethod.GET, entity, Array<Project>::class.java)
        val projects = response.body?.toList() ?: emptyList()

        projects.forEach { project ->
            val potentialImageUrl = "https://raw.githubusercontent.com/$username/${project.name}/main/preview.png"

            project.previewUrl = if (checkImageExists(potentialImageUrl)) potentialImageUrl else null

            fetchLanguages(username, project, entity)
        }

        return projects
    }

    private fun checkImageExists(url: String): Boolean {
        return try {
            val response = restTemplate.execute(url, HttpMethod.HEAD, null, { it.statusCode.is2xxSuccessful })
            response ?: false
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
                    (bytes / totalBytes * 100).let { Math.round(it * 10.0) / 10.0 }
                }
            }
        } catch (e: Exception) {
            project.languageBreakdown = emptyMap()
        }
    }
}