package com.skillswap.controller;

import com.skillswap.dto.UserSkillDto;
import com.skillswap.entity.UserSkill;
import com.skillswap.service.UserSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-skills")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001" })
public class UserSkillController {

    @Autowired
    private UserSkillService userSkillService;

    @PostMapping
    public ResponseEntity<UserSkillDto> addUserSkill(@RequestBody UserSkillDto userSkillDto,
            Authentication authentication) {
        String username = authentication.getName();
        // You might want to validate that the user is adding skills to their own
        // profile
        UserSkillDto createdUserSkill = userSkillService.addUserSkill(userSkillDto);
        return ResponseEntity.ok(createdUserSkill);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserSkillDto>> getUserSkills(@PathVariable Long userId) {
        List<UserSkillDto> userSkills = userSkillService.getUserSkills(userId);
        return ResponseEntity.ok(userSkills);
    }

    @GetMapping("/user/{userId}/type/{skillType}")
    public ResponseEntity<List<UserSkillDto>> getUserSkillsByType(@PathVariable Long userId,
            @PathVariable UserSkill.SkillType skillType) {
        List<UserSkillDto> userSkills = userSkillService.getUserSkillsByType(userId, skillType);
        return ResponseEntity.ok(userSkills);
    }

    @GetMapping("/skill/{skillId}/type/{skillType}")
    public ResponseEntity<List<UserSkillDto>> getAvailableSkillsBySkillId(@PathVariable Long skillId,
            @PathVariable UserSkill.SkillType skillType) {
        List<UserSkillDto> userSkills = userSkillService.getAvailableSkillsBySkillId(skillId, skillType);
        return ResponseEntity.ok(userSkills);
    }

    @GetMapping("/category/{category}/type/{skillType}")
    public ResponseEntity<List<UserSkillDto>> getSkillsByCategoryAndType(@PathVariable String category,
            @PathVariable UserSkill.SkillType skillType) {
        List<UserSkillDto> userSkills = userSkillService.getSkillsByCategoryAndType(category, skillType);
        return ResponseEntity.ok(userSkills);
    }

    @GetMapping("/search/type/{skillType}")
    public ResponseEntity<List<UserSkillDto>> searchSkillsByQueryAndType(@RequestParam String query,
            @PathVariable UserSkill.SkillType skillType) {
        List<UserSkillDto> userSkills = userSkillService.searchSkillsByQueryAndType(query, skillType);
        return ResponseEntity.ok(userSkills);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserSkillDto> updateUserSkill(@PathVariable Long id, @RequestBody UserSkillDto userSkillDto) {
        UserSkillDto updatedUserSkill = userSkillService.updateUserSkill(id, userSkillDto);
        return ResponseEntity.ok(updatedUserSkill);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserSkill(@PathVariable Long id) {
        userSkillService.deleteUserSkill(id);
        return ResponseEntity.ok().build();
    }
}
