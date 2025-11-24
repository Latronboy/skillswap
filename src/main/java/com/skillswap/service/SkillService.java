package com.skillswap.service;

import com.skillswap.dto.SkillDto;
import com.skillswap.entity.Skill;
import com.skillswap.repository.SkillRepository;
import com.skillswap.repository.UserSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;

    public SkillDto createSkill(SkillDto skillDto) {
        Skill skill = new Skill();
        skill.setName(skillDto.getName());
        skill.setDescription(skillDto.getDescription());
        skill.setCategory(skillDto.getCategory());
        skill.setIconUrl(skillDto.getIconUrl());

        Skill savedSkill = skillRepository.save(skill);
        return convertToDto(savedSkill);
    }

    public SkillDto getSkillById(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found with id: " + id));
        return convertToDto(skill);
    }

    public List<SkillDto> getAllSkills() {
        List<Skill> skills = skillRepository.findByIsActiveTrue();
        return skills.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<SkillDto> getSkillsByCategory(String category) {
        List<Skill> skills = skillRepository.findByCategory(category);
        return skills.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<SkillDto> searchSkills(String query) {
        List<Skill> skills = skillRepository.searchSkills(query);
        return skills.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<String> getCategories() {
        return skillRepository.findDistinctCategories();
    }

    public List<SkillDto> getMostPopularSkills() {
        List<Skill> skills = skillRepository.findMostPopularSkills();
        return skills.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public SkillDto updateSkill(Long id, SkillDto skillDto) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found with id: " + id));

        skill.setName(skillDto.getName());
        skill.setDescription(skillDto.getDescription());
        skill.setCategory(skillDto.getCategory());
        skill.setIconUrl(skillDto.getIconUrl());

        Skill updatedSkill = skillRepository.save(skill);
        return convertToDto(updatedSkill);
    }

    public void deleteSkill(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found with id: " + id));

        skill.setIsActive(false);
        skillRepository.save(skill);
    }

    public SkillDto convertToDto(Skill skill) {
        SkillDto dto = new SkillDto();
        dto.setId(skill.getId());
        dto.setName(skill.getName());
        dto.setDescription(skill.getDescription());
        dto.setCategory(skill.getCategory());
        dto.setIconUrl(skill.getIconUrl());
        dto.setIsActive(skill.getIsActive());

        // Get user count for this skill
        Long userCount = userSkillRepository.countBySkillIdAndSkillType(
                skill.getId(),
                com.skillswap.entity.UserSkill.SkillType.OFFER);
        dto.setUserCount(userCount);

        return dto;
    }

    public Skill convertToEntity(SkillDto dto) {
        Skill skill = new Skill();
        skill.setId(dto.getId());
        skill.setName(dto.getName());
        skill.setDescription(dto.getDescription());
        skill.setCategory(dto.getCategory());
        skill.setIconUrl(dto.getIconUrl());
        skill.setIsActive(dto.getIsActive());
        return skill;
    }
}
