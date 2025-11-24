package com.skillswap.controller;

import com.skillswap.dto.SkillDto;
import com.skillswap.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/skills")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001" })
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping
    public ResponseEntity<List<SkillDto>> getAllSkills() {
        List<SkillDto> skills = skillService.getAllSkills();
        return ResponseEntity.ok(skills);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillDto> getSkillById(@PathVariable Long id) {
        SkillDto skill = skillService.getSkillById(id);
        return ResponseEntity.ok(skill);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<SkillDto>> getSkillsByCategory(@PathVariable String category) {
        List<SkillDto> skills = skillService.getSkillsByCategory(category);
        return ResponseEntity.ok(skills);
    }

    @GetMapping("/search")
    public ResponseEntity<List<SkillDto>> searchSkills(@RequestParam String query) {
        List<SkillDto> skills = skillService.searchSkills(query);
        return ResponseEntity.ok(skills);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> categories = skillService.getCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/popular")
    public ResponseEntity<List<SkillDto>> getMostPopularSkills() {
        List<SkillDto> skills = skillService.getMostPopularSkills();
        return ResponseEntity.ok(skills);
    }

    @PostMapping
    public ResponseEntity<SkillDto> createSkill(@RequestBody SkillDto skillDto) {
        SkillDto createdSkill = skillService.createSkill(skillDto);
        return ResponseEntity.ok(createdSkill);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillDto> updateSkill(@PathVariable Long id, @RequestBody SkillDto skillDto) {
        SkillDto updatedSkill = skillService.updateSkill(id, skillDto);
        return ResponseEntity.ok(updatedSkill);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok().build();
    }
}
