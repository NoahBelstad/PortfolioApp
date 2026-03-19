package com.portfolio.backend

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/users")
class UserController(private val repository: UserRepository) {

    @GetMapping
    fun getAllUsers(): List<User> = repository.findAll()

    @PostMapping
    fun createUser(@RequestBody user: User): User = repository.save(user)
}