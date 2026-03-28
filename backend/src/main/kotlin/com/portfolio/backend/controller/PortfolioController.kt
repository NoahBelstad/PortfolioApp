package com.portfolio.backend.controller

import com.portfolio.backend.models.Project
import com.portfolio.backend.service.PortfolioService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api/v1/github")
@CrossOrigin(origins = ["http://localhost:5173"])
class PortfolioController(private val service: PortfolioService) {

    @GetMapping("/{username}")
    fun getProjetcs(@PathVariable username: String): List<Project> {
        return service.getGithubRepos(username)
    }
}