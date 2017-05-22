package com.zbin.coachtalk.busi.service;

import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;

public interface ConnectionPoolService {
//    public void prepareConnection(HttpServletRequest request) throws ClassNotFoundException, IllegalAccessException, InstantiationException;

    void refreshMessage(List<String> userList, String connectionType) throws IOException;

    boolean removeConnection(String sessionId);

//    void afterConnectionEstablished(WebSocketSession session) throws Exception;

    void replyMessage(String connectionType,String subType,String userId) throws IOException;

    void activeConnection(WebSocketSession session, String userName, String connectionType) throws IOException;
}
