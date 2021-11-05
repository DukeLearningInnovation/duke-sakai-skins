package org.sakaiproject.conversations.impl;

import java.util.Optional;

import org.sakaiproject.conversations.api.ConversationsReferenceReckoner;
import org.sakaiproject.conversations.api.ConversationsService;

import org.sakaiproject.entity.api.Entity;
import org.sakaiproject.entity.api.EntityProducer;
import org.sakaiproject.entity.api.Reference;

import org.springframework.beans.factory.annotation.Autowired;

public class ConversationsEntityProducer implements EntityProducer {

  @Autowired private ConversationsService conversationsService;

  public Optional<String> getEntityUrl(Reference ref, Entity.UrlType urlType) {
    
    switch (urlType) {
      case PORTAL:
        String id = ConversationsReferenceReckoner.reckoner().reference(ref.getReference()).reckon().getId();
        return conversationsService.getTopicPortalUrl(id);
      default:
    }

    return Optional.empty();
  }
}
