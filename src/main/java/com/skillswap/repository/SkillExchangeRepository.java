package com.skillswap.repository;

import com.skillswap.entity.SkillExchange;
import com.skillswap.entity.SkillExchange.ExchangeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillExchangeRepository extends JpaRepository<SkillExchange, Long> {

       List<SkillExchange> findByRequesterId(Long requesterId);

       List<SkillExchange> findByProviderId(Long providerId);

       List<SkillExchange> findByRequesterIdOrProviderId(Long requesterId, Long providerId);

       List<SkillExchange> findByStatus(ExchangeStatus status);

       List<SkillExchange> findByRequesterIdAndStatus(Long requesterId, ExchangeStatus status);

       List<SkillExchange> findByProviderIdAndStatus(Long providerId, ExchangeStatus status);

       @Query("SELECT se FROM SkillExchange se WHERE " +
                     "(se.requester.id = :userId OR se.provider.id = :userId) AND " +
                     "se.status = :status")
       List<SkillExchange> findByUserIdAndStatus(@Param("userId") Long userId, @Param("status") ExchangeStatus status);

       @Query("SELECT se FROM SkillExchange se WHERE " +
                     "se.requester.id = :userId AND se.status IN ('PENDING', 'ACCEPTED', 'IN_PROGRESS')")
       List<SkillExchange> findActiveExchangesForUser(@Param("userId") Long userId);

       @Query("SELECT COUNT(se) FROM SkillExchange se WHERE " +
                     "(se.requester.id = :userId OR se.provider.id = :userId) AND " +
                     "se.status = 'COMPLETED'")
       Long countCompletedExchangesForUser(@Param("userId") Long userId);

       @Query("SELECT AVG(se.requesterRating) FROM SkillExchange se WHERE se.provider.id = :userId AND se.requesterRating IS NOT NULL")
       Double getAverageRatingAsProvider(@Param("userId") Long userId);

       @Query("SELECT AVG(se.providerRating) FROM SkillExchange se WHERE se.requester.id = :userId AND se.providerRating IS NOT NULL")
       Double getAverageRatingAsRequester(@Param("userId") Long userId);
}
