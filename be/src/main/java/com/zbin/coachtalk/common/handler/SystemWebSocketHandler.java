/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.zbin.coachtalk.common.handler;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.zbin.coachtalk.busi.service.ConnectionPoolService;
import com.zbin.coachtalk.common.Constants;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Component
public class SystemWebSocketHandler implements WebSocketHandler {
    private static final Logger logger;
    private static final Gson gson;

    private static String HEADER_ACTIVE = "active:";
    private static String HEADER_READ = "read:";

    @Resource(name = "connectionPoolService")
    private ConnectionPoolService connectionPoolService;

    static {
        logger = Logger.getLogger(SystemWebSocketHandler.class);
        GsonBuilder gb = new GsonBuilder();
        gson = gb.create();
    }



    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//        connectionPoolService.afterConnectionEstablished(session);
        session.sendMessage(new TextMessage("success"));
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> wsm) throws Exception {
        String receiveMessage = wsm.getPayload().toString();
        if (receiveMessage.startsWith(HEADER_ACTIVE)) {
            receiveMessage = receiveMessage.replaceFirst(HEADER_ACTIVE, "");
            Map<String, String> receiveMap = new HashMap<>();
            receiveMap = Constants.GSON.fromJson(receiveMessage, receiveMap.getClass());
            connectionPoolService.activeConnection(session, receiveMap.get("userName"), receiveMap.get("connectionType"));
        } else if (receiveMessage.startsWith(HEADER_READ)) {
            receiveMessage = receiveMessage.replaceFirst(HEADER_READ, "");
            Map<String, String> receiveMap = new HashMap<>();
            receiveMap = Constants.GSON.fromJson(receiveMessage, receiveMap.getClass());
            connectionPoolService.replyMessage(receiveMap.get("connectionType"), receiveMap.get("subType"), receiveMap.get("userId"));
        } else {
            session.sendMessage(new TextMessage("Not understand the message of : " + receiveMessage));
        }
    }

    @Override
    public void handleTransportError(WebSocketSession wss, Throwable thrwbl) throws Exception {
        connectionPoolService.removeConnection(wss.getId());
        logger.debug("websocket connection closed......:");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession wss, CloseStatus cs) throws Exception {
        connectionPoolService.removeConnection(wss.getId());
        logger.debug("websocket connection closed......:");
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
