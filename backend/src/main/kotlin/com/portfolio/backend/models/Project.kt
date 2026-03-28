package com.portfolio.backend.models

import com.fasterxml.jackson.annotation.JsonProperty

data class Project(
    val name: String,
    val description: String?,
    @JsonProperty("html_url")
    val url: String?,
    val language: String?, // Primary language from GitHub

    var previewUrl: String? = null,

    var languageBreakdown: Map<String, Double>? = null
)