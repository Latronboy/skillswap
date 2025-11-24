package com.skillswap.dto;

import com.skillswap.entity.SkillExchange.ExchangeStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public class SkillExchangeDto {

    private Long id;

    @NotNull
    private Long requesterId;

    @NotNull
    private Long providerId;

    @NotNull
    private Long requestedSkillId;

    @NotNull
    private Long offeredSkillId;

    private String requesterName;

    private String providerName;

    private String requestedSkillName;

    private String offeredSkillName;

    private ExchangeStatus status;

    @Size(max = 1000)
    private String message;

    private Integer requesterRating;

    private Integer providerRating;

    private String requesterFeedback;

    private String providerFeedback;

    private LocalDateTime scheduledDate;

    private LocalDateTime completedDate;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // Constructors
    public SkillExchangeDto() {
    }

    public SkillExchangeDto(Long requesterId, Long providerId, Long requestedSkillId, Long offeredSkillId) {
        this.requesterId = requesterId;
        this.providerId = providerId;
        this.requestedSkillId = requestedSkillId;
        this.offeredSkillId = offeredSkillId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRequesterId() {
        return requesterId;
    }

    public void setRequesterId(Long requesterId) {
        this.requesterId = requesterId;
    }

    public Long getProviderId() {
        return providerId;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }

    public Long getRequestedSkillId() {
        return requestedSkillId;
    }

    public void setRequestedSkillId(Long requestedSkillId) {
        this.requestedSkillId = requestedSkillId;
    }

    public Long getOfferedSkillId() {
        return offeredSkillId;
    }

    public void setOfferedSkillId(Long offeredSkillId) {
        this.offeredSkillId = offeredSkillId;
    }

    public String getRequesterName() {
        return requesterName;
    }

    public void setRequesterName(String requesterName) {
        this.requesterName = requesterName;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public String getRequestedSkillName() {
        return requestedSkillName;
    }

    public void setRequestedSkillName(String requestedSkillName) {
        this.requestedSkillName = requestedSkillName;
    }

    public String getOfferedSkillName() {
        return offeredSkillName;
    }

    public void setOfferedSkillName(String offeredSkillName) {
        this.offeredSkillName = offeredSkillName;
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
}
