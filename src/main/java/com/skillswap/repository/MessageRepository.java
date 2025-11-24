package com.skillswap.repository;

import com.skillswap.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

       List<Message> findBySenderIdAndReceiverId(Long senderId, Long receiverId);

       List<Message> findByReceiverIdAndIsReadFalse(Long receiverId);

       @Query("SELECT m FROM Message m WHERE m.sender.id = :userId OR m.receiver.id = :userId ORDER BY m.createdAt DESC")
       List<Message> findByUserId(@Param("userId") Long userId);

       @Query("SELECT m FROM Message m WHERE " +
                     "(m.sender.id = :user1Id AND m.receiver.id = :user2Id) OR " +
                     "(m.sender.id = :user2Id AND m.receiver.id = :user1Id) " +
                     "ORDER BY m.createdAt ASC")
       List<Message> findConversationBetweenUsers(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);

       Long countByReceiverIdAndIsReadFalse(Long receiverId);

       @Query("SELECT DISTINCT CASE WHEN m.sender.id = :userId THEN m.receiver ELSE m.sender END " +
                     "FROM Message m WHERE m.sender.id = :userId OR m.receiver.id = :userId")
       List<Object> findConversationPartnersForUser(@Param("userId") Long userId);
}
