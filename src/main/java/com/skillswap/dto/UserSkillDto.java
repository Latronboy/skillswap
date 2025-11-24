package com.skillswap.dto;

import com.skillswap.entity.UserSkill.SkillType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UserSkillDto {

    private Long id;

    @NotNull
    private Long userId;
    private String userName;

    @NotNull
    private Long skillId;
    private String skillName;
    private String skillCategory;

    @NotNull
    private SkillType skillType;

    private Integer proficiencyLevel;

    @Size(max = 1000)
    private String description;

    private Boolean isAvailable;

    // Constructors
    public UserSkillDto() {
    }

    public UserSkillDto(Long userId, Long skillId, SkillType skillType) {
        this.userId = userId;
        this.skillId = skillId;
        this.skillType = skillType;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getSkillId() {
        return skillId;
    }

    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public String getSkillCategory() {
        return skillCategory;
    }

    public void setSkillCategory(String skillCategory) {
        this.skillCategory = skillCategory;
    }

    public SkillType getSkillType() {
        return skillType;
    }

    public void setSkillType(SkillType skillType) {
        this.skillType = skillType;
    }

    public Integer getProficiencyLevel() {
        return proficiencyLevel;
    }

    public void setProficiencyLevel(Integer proficiencyLevel) {
        this.proficiencyLevel = proficiencyLevel;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }
}
