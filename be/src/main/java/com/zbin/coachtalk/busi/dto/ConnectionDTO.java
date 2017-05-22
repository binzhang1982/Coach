package com.zbin.coachtalk.busi.dto;

import org.springframework.web.socket.WebSocketSession;

public class ConnectionDTO {
    private String sessionId;
    private String userName;
    private String connectionType;
    private WebSocketSession webSocketSession;

    public ConnectionDTO() {

    }

    public ConnectionDTO(String sessionId, String userName, String connectionType, WebSocketSession webSocketSession) {
        this.sessionId = sessionId;
        this.userName = userName;
        this.connectionType = connectionType;
        this.webSocketSession = webSocketSession;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getConnectionType() {
        return connectionType;
    }

    public void setConnectionType(String connectionType) {
        this.connectionType = connectionType;
    }

    public WebSocketSession getWebSocketSession() {
        return webSocketSession;
    }

    public void setWebSocketSession(WebSocketSession webSocketSession) {
        this.webSocketSession = webSocketSession;
    }
}
