package org.sakaiproject.conversations.impl.repository;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import org.sakaiproject.conversations.api.model.Post;
import org.sakaiproject.conversations.api.repository.PostRepository;
import org.sakaiproject.springframework.data.SpringCrudRepositoryImpl;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

public class PostRepositoryImpl extends SpringCrudRepositoryImpl<Post, String>  implements PostRepository {

    @Transactional(readOnly = true)
    public List<Post> findByTopic_Id(String topicId) {

        return (List<Post>) sessionFactory.getCurrentSession().createCriteria(Post.class)
            .add(Restrictions.eq("topic.id", topicId))
            .list();
    }

    @Transactional(readOnly = true)
    public List<Post> findByTopic_IdAndParentPostIdIsNull(String topicId) {

        return (List<Post>) sessionFactory.getCurrentSession().createCriteria(Post.class)
            .add(Restrictions.eq("topic.id", topicId))
            .add(Restrictions.isNull("parentPostId"))
            .addOrder(Order.asc("metadata.created")).list();
    }

    @Transactional(readOnly = true)
    public List<Post> findByParentPostId(String parentPostId) {

        return (List<Post>) sessionFactory.getCurrentSession().createCriteria(Post.class)
            .add(Restrictions.eq("parentPostId", parentPostId))
            .list();
    }

    @Transactional(readOnly = true)
    public Long countByParentPostId(String parentPostId) {

        return (Long) sessionFactory.getCurrentSession().createCriteria(Post.class)
            .add(Restrictions.eq("parentPostId", parentPostId))
            .setProjection(Projections.rowCount()).uniqueResult();
    }

    @Transactional(readOnly = true)
    public List<Post> findByParentThreadId(String parentThreadId) {

        return (List<Post>) sessionFactory.getCurrentSession().createCriteria(Post.class)
            .add(Restrictions.eq("parentThreadId", parentThreadId))
            .list();
    }

    @Transactional
    public Integer deleteByTopic_Id(String topicId) {

        return sessionFactory.getCurrentSession()
            .createQuery("delete from Post where topic.id = :topicId")
            .setString("topicId", topicId).executeUpdate();
    }

    @Transactional
    public Integer lockByTopic_Id(Boolean locked, String topicId) {

        return sessionFactory.getCurrentSession()
            .createQuery("update Post set locked = :locked where topic.id = :topicId")
            .setString("topicId", topicId).setBoolean("locked", locked).executeUpdate();
    }

    @Transactional
    public Integer lockByParentPostId(Boolean locked, String parentPostId) {

        return sessionFactory.getCurrentSession()
            .createQuery("update Post set locked = :locked where parentPostId = :parentPostId")
            .setString("parentPostId", parentPostId).setBoolean("locked", locked).executeUpdate();
    }

    @Transactional
    public Integer lockBySiteId(String siteId, Boolean locked) {

        return sessionFactory.getCurrentSession()
            .createQuery("update Post set locked = :locked where siteId = :siteId")
            .setString("siteId", siteId).setBoolean("locked", locked).executeUpdate();
    }
}
