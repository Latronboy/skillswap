package com.skillswap.repository;

import com.skillswap.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

       Optional<Skill> findByName(String name);

       List<Skill> findByCategory(String category);

       List<Skill> findByIsActiveTrue();

       @Query("SELECT s FROM Skill s WHERE " +
                     "LOWER(s.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
                     "LOWER(s.description) LIKE LOWER(CONCAT('%', :query, '%'))")
       List<Skill> searchSkills(@Param("query") String query);

       @Query("SELECT DISTINCT s.category FROM Skill s WHERE s.isActive = true ORDER BY s.category")
       List<String> findDistinctCategories();

       @Query("SELECT s FROM Skill s WHERE s.isActive = true " +
                     "ORDER BY (SELECT COUNT(us) FROM UserSkill us WHERE us.skill = s) DESC")
       List<Skill> findMostPopularSkills();
}
