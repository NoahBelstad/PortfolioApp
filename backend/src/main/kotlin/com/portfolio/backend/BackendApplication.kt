package com.portfolio.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.web.client.RestTemplate

@SpringBootApplication
class BackendApplication{
	@Bean
	fun restTemplate(): RestTemplate = RestTemplate()
}

fun main(args: Array<String>) {
	runApplication<BackendApplication>(*args)
}
