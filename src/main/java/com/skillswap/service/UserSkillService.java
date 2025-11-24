package com.skillswap.service;

import com.skillswap.dto.UserSkillDto;
import com.skillswap.entity.Skill;
import com.skillswap.entity.User;
import com.skillswap.entity.UserSkill;
import com.skillswap.repository.SkillRepository;
import com.skillswap.repository.UserRepository;
import com.skillswap.repository.UserSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserSkillService {

    @Autowired
    private UserSkillRepository userSkillRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    public UserSkillDto addUserSkill(UserSkillDto userSkillDto) {
        User user = userRepository.findById(userSkillDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userSkillDto.getUserId()));

        Skill skill = skillRepository.findById(userSkillDto.getSkillId())
                .orElseThrow(() -> new RuntimeException("Skill not found with id: " + userSkillDto.getSkillId()));

        // Check if user already has this skill with this type
        UserSkill existingUserSkill = userSkillRepository.findByUserAndSkillAndType(
                user.getId(), skill.getId(), userSkillDto.getSkillType());

        if (existingUserSkill != null) {
            throw new RuntimeException("User already has this skill with this type");
        }

        UserSkill userSkill = new UserSkill();
        userSkill.setUser(user);
        userSkill.setSkill(skill);
        userSkill.setSkillType(userSkillDto.getSkillType());
        userSkill.setProficiencyLevel(userSkillDto.getProficiencyLevel());
        userSkill.setDescription(userSkillDto.getDescription());
        userSkill.setIsAvailable(userSkillDto.getIsAvailable());

        UserSkill savedUserSkill = userSkillRepository.save(userSkill);
        return convertToDto(savedUserSkill);
    }

    public List<UserSkillDto> getUserSkills(Long userId) {
        List<UserSkill> userSkills = userSkillRepository.findByUserId(userId);
        return userSkills.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<UserSkillDto> getUserSkillsByType(Long userId, UserSkill.SkillType skillType) {
        List<UserSkill> userSkills = userSkillRepository.findByUserIdAndSkillType(userId, skillType);
        return userSkills.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<UserSkillDto> getAvailableSkillsBySkillId(Long skillId, UserSkill.SkillType skillType) {
        List<UserSkill> userSkills = userSkillRepository.findAvailableBySkillIdAndType(skillId, skillType);
        return userSkills.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<UserSkillDto> getSkillsByCategoryAndType(String category, UserSkill.SkillType skillType) {
        List<UserSkill> userSkills = userSkillRepository.findByCategoryAndType(category, skillType);
        return userSkills.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<UserSkillDto> searchSkillsByQueryAndType(String query, UserSkill.SkillType skillType) {
        List<UserSkill> userSkills = userSkillRepository.searchByQueryAndType(query, skillType);
        return userSkills.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public UserSkillDto updateUserSkill(Long id, UserSkillDto userSkillDto) {
        UserSkill userSkill = userSkillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("UserSkill not found with id: " + id));

        userSkill.setProficiencyLevel(userSkillDto.getProficiencyLevel());
        userSkill.setDescription(userSkillDto.getDescription());
        userSkill.setIsAvailable(userSkillDto.getIsAvailable());

        UserSkill updatedUserSkill = userSkillRepository.save(userSkill);
        return convertToDto(updatedUserSkill);
    }

    public void deleteUserSkill(Long id) {
        userSkillRepository.deleteById(id);
    }

    public UserSkillDto convertToDto(UserSkill userSkill) {
        UserSkillDto dto = new UserSkillDto();
        dto.setId(userSkill.getId());
        dto.setUserId(userSkill.getUser().getId());
        dto.setSkillId(userSkill.getSkill().getId());
        dto.setSkillName(userSkill.getSkill().getName());
        dto.setSkillCategory(userSkill.getSkill().getCategory());
        dto.setSkillType(userSkill.getSkillType());
        dto.setProficiencyLevel(userSkill.getProficiencyLevel());
        dto.setDescription(userSkill.getDescription());
        dto.setIsAvailable(userSkill.getIsAvailable());
        return dto;
    }

    public UserSkill convertToEntity(UserSkillDto dto) {
        UserSkill userSkill = new UserSkill();
        userSkill.setId(dto.getId());
        userSkill.setSkillType(dto.getSkillType());
        userSkill.setProficiencyLevel(dto.getProficiencyLevel());
        userSkill.setDescription(dto.getDescription());
        userSkill.setIsAvailable(dto.getIsAvailable());
        return userSkill;
    }
}
