package com.skillswap.repository;

import com.skillswap.entity.UserSkill;
import com.skillswap.entity.UserSkill.SkillType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {

    List<UserSkill> findByUserId(Long userId);

    List<UserSkill> findByUserIdAndSkillType(Long userId, SkillType skillType);

    List<UserSkill> findBySkillId(Long skillId);

    @Query("SELECT us FROM UserSkill us WHERE us.skill.id = :skillId AND us.skillType = :skillType AND us.isAvailable = true")
    List<UserSkill> findAvailableBySkillIdAndType(@Param("skillId") Long skillId,
            @Param("skillType") SkillType skillType);

    @Query("SELECT us FROM UserSkill us WHERE us.user.id = :userId AND us.skill.id = :skillId AND us.skillType = :skillType")
    UserSkill findByUserAndSkillAndType(@Param("userId") Long userId, @Param("skillId") Long skillId,
            @Param("skillType") SkillType skillType);

    Long countBySkillIdAndSkillType(Long skillId, SkillType skillType);

    @Query("SELECT us FROM UserSkill us WHERE us.skill.category = :category AND us.skillType = :skillType")
    List<UserSkill> findByCategoryAndType(@Param("category") String category, @Param("skillType") SkillType skillType);

    @Query("SELECT us FROM UserSkill us WHERE us.skillType = :skillType AND " +
            "(LOWER(us.skill.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(us.skill.description) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<UserSkill> searchByQueryAndType(@Param("query") String query, @Param("skillType") SkillType skillType);
}
