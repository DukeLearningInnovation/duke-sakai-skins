package org.sakaiproject.conversations.api.repository;

import java.util.List;

import org.sakaiproject.conversations.api.model.Post;
import org.sakaiproject.springframework.data.SpringCrudRepository;

import org.springframework.data.domain.Pageable;

public interface PostRepository extends SpringCrudRepository<Post, String> {

    List<Post> findByTopic_Id(String topicId);
    List<Post> findByTopic_IdAndParentPostIdIsNull(String topicId);
    List<Post> findByParentPostId(String parentPostId);
    Long countByParentPostId(String parentPostId);
    List<Post> findByParentThreadId(String parentThreadId);
    Integer deleteByTopic_Id(String topicId);
    Integer lockByTopic_Id(Boolean locked, String topicId);
    Integer lockByParentPostId(Boolean locked, String parentPostId);
    Integer lockBySiteId(String siteId, Boolean locked);
}
