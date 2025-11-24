package com.skillswap.config;

import com.skillswap.entity.Skill;
import com.skillswap.entity.User;
import com.skillswap.repository.SkillRepository;
import com.skillswap.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Arrays;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initData(UserRepository userRepository, SkillRepository skillRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            // Create Users
            if (userRepository.count() == 0) {
                User user = new User();
                user.setUsername("user");
                user.setEmail("user@example.com");
                user.setPassword(passwordEncoder.encode("password"));
                user.setFirstName("John");
                user.setLastName("Doe");
                user.setBio("I am a software developer looking to learn new skills.");
                user.setLocation("New York, USA");
                user.setIsVerified(true);
                user.setIsActive(true);
                user.setCreatedAt(LocalDateTime.now());
                user.setUpdatedAt(LocalDateTime.now());
                userRepository.save(user);

                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@example.com");
                admin.setPassword(passwordEncoder.encode("admin"));
                admin.setFirstName("Admin");
                admin.setLastName("User");
                admin.setBio("System Administrator");
                admin.setLocation("San Francisco, USA");
                admin.setIsVerified(true);
                admin.setIsActive(true);
                admin.setCreatedAt(LocalDateTime.now());
                admin.setUpdatedAt(LocalDateTime.now());
                userRepository.save(admin);

                System.out.println("Users seeded: user/password, admin/admin");
            }

            // Create Skills
            if (skillRepository.count() == 0) {
                Skill java = new Skill();
                java.setName("Java Programming");
                java.setDescription("Core Java, Spring Boot, and related technologies");
                java.setCategory("Technology");
                java.setIsActive(true);
                java.setCreatedAt(LocalDateTime.now());
                java.setUpdatedAt(LocalDateTime.now());

                Skill react = new Skill();
                react.setName("React JS");
                react.setDescription("Frontend development with React");
                react.setCategory("Technology");
                react.setIsActive(true);
                react.setCreatedAt(LocalDateTime.now());
                react.setUpdatedAt(LocalDateTime.now());

                Skill spanish = new Skill();
                spanish.setName("Spanish Language");
                spanish.setDescription("Conversational and written Spanish");
                spanish.setCategory("Language");
                spanish.setIsActive(true);
                spanish.setCreatedAt(LocalDateTime.now());
                spanish.setUpdatedAt(LocalDateTime.now());

                skillRepository.saveAll(Arrays.asList(java, react, spanish));
                System.out.println("Skills seeded");
            }
        };
    }
}
