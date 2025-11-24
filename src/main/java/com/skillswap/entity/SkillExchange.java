package com.skillswap.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "skill_exchanges")
@EntityListeners(AuditingEntityListener.class)
public class SkillExchange {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requester_id", nullable = false)
    @NotNull
    private User requester;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id", nullable = false)
    @NotNull
    private User provider;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requested_skill_id", nullable = false)
    @NotNull
    private Skill requestedSkill;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offered_skill_id", nullable = false)
    @NotNull
    private Skill offeredSkill;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ExchangeStatus status = ExchangeStatus.PENDING;

    @Column(name = "message", length = 1000)
    private String message;

    @Column(name = "requester_rating")
    private Integer requesterRating; // 1-5 scale

    @Column(name = "provider_rating")
    private Integer providerRating; // 1-5 scale

    @Column(name = "requester_feedback", length = 1000)
    private String requesterFeedback;

    @Column(name = "provider_feedback", length = 1000)
    private String providerFeedback;

    @Column(name = "scheduled_date")
    private LocalDateTime scheduledDate;

    @Column(name = "completed_date")
    private LocalDateTime completedDate;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public SkillExchange() {
    }

    public SkillExchange(User requester, User provider, Skill requestedSkill, Skill offeredSkill) {
        this.requester = requester;
        this.provider = provider;
        this.requestedSkill = requestedSkill;
        this.offeredSkill = offeredSkill;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getRequester() {
        return requester;
    }

    public void setRequester(User requester) {
        this.requester = requester;
    }

    public User getProvider() {
        return provider;
    }

    public void setProvider(User provider) {
        this.provider = provider;
    }

    public Skill getRequestedSkill() {
        return requestedSkill;
    }

    public void setRequestedSkill(Skill requestedSkill) {
        this.requestedSkill = requestedSkill;
    }

    public Skill getOfferedSkill() {
        return offeredSkill;
    }

    public void setOfferedSkill(Skill offeredSkill) {
        this.offeredSkill = offeredSkill;
    }

    public ExchangeStatus getStatus() {
        return status;
    }

    public void setStatus(ExchangeStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getRequesterRating() {
        return requesterRating;
    }

    public void setRequesterRating(Integer requesterRating) {
        this.requesterRating = requesterRating;
    }

    public Integer getProviderRating() {
        return providerRating;
    }

    public void setProviderRating(Integer providerRating) {
        this.providerRating = providerRating;
    }

    public String getRequesterFeedback() {
        return requesterFeedback;
    }

    public void setRequesterFeedback(String requesterFeedback) {
        this.requesterFeedback = requesterFeedback;
    }

    public String getProviderFeedback() {
        return providerFeedback;
    }

    public void setProviderFeedback(String providerFeedback) {
        this.providerFeedback = providerFeedback;
    }

    public LocalDateTime getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(LocalDateTime scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public LocalDateTime getCompletedDate() {
        return completedDate;
    }

    public void setCompletedDate(LocalDateTime completedDate) {
        this.completedDate = completedDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public enum ExchangeStatus {
        PENDING, // Exchange request sent, waiting for response
        ACCEPTED, // Exchange accepted by provider
        IN_PROGRESS, // Exchange is ongoing
        COMPLETED, // Exchange completed successfully
        CANCELLED, // Exchange cancelled by either party
        REJECTED // Exchange rejected by provider
    }
}
