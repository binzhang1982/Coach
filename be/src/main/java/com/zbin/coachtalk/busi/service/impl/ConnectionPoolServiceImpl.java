package com.zbin.coachtalk.busi.service.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.zbin.coachtalk.busi.dto.ConnectionDTO;
import com.zbin.coachtalk.busi.service.ConnectionPoolService;
import com.zbin.coachtalk.common.utils.Utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("connectionPoolService")
public class ConnectionPoolServiceImpl implements ConnectionPoolService {
    private static Logger logger = Logger.getLogger(ConnectionPoolServiceImpl.class);

    private static final List<ConnectionDTO> connections = new ArrayList<>(); 
    // TODO use hashmap to save connections is more comfortable.


    @Override
    public void refreshMessage(List<String> userList, String connectionType) throws IOException {
        // send the whole message for user or users
        List<ConnectionDTO> refreshConnections = new ArrayList<>();
        for (ConnectionDTO connection : connections) {
            if (userList.contains(connection.getUserName())
                    && connectionType.equals(connection.getConnectionType())) {
                refreshConnections.add(connection);
            }
        }
        List<ConnectionDTO> failConnections = new ArrayList<>();
        if (Utils.listNotNull(refreshConnections)) {
            for (ConnectionDTO refreshConnection : refreshConnections) {
                boolean res = this.refreshConnection(refreshConnection);
                if (!res) {
                    failConnections.add(refreshConnection);
                }
            }
        }
        for (ConnectionDTO failConnection : failConnections) {
            connections.remove(failConnection);
        }
    }

    private boolean refreshConnection(ConnectionDTO connectionDTO) throws IOException {
//        List<Notification> notificationList =
//                notificationMapper.selectWithDetail(
//                        connectionDTO.getUserName(),
//                        connectionDTO.getConnectionType(),
//                        null,
//                        Constants.MONITOR_STATUS_ACTIVED,
//                        null);
//        Map<String, MonitorConnectionDTO.Item> monitorConnectionDTOMap = new HashMap<>();
//        if (Utils.listNotNull(notificationList)) {
//            for (Notification notification : notificationList) {
//                String subType = notification.getSubType();
//                MonitorConnectionDTO.Item item = null;
//                if (monitorConnectionDTOMap.containsKey(subType)) {
//                    item = monitorConnectionDTOMap.get(subType);
//                    item.num++;
//                } else {
//                    item = MonitorConnectionDTO.buildItem();
//                    item.connectionType = notification.getConnectionType();
//                    item.subType = notification.getSubType();
//                    item.num = 1;
//                    monitorConnectionDTOMap.put(item.subType, item);
//                }
//            }
//        }
//        MonitorConnectionDTO monitorConnectionDTO = new MonitorConnectionDTO();
//        monitorConnectionDTO.setItems(new ArrayList<MonitorConnectionDTO.Item>(monitorConnectionDTOMap.values()));
//        return this.sendMessageToSession(
//                connectionDTO.getWebSocketSession(),
//                new TextMessage(Constants.GSON.toJson(monitorConnectionDTO)));
    	return false;
    }

    private ConnectionDTO addConnection(WebSocketSession session) {
//        String userName = Utils.getUserNameFromSession(session);
//        String connectionType = Utils.getConnectionTypeFromSession(session);
//        String sessionId = session.getId();
//        if (Utils.stringNotEmpty(userName)) {
//            ConnectionDTO connection = new ConnectionDTO(sessionId, userName, connectionType, session);
//            connections.add(connection);
//            return connection;
//        }
        return null;
    }

    @Override
    public boolean removeConnection(String sessionId) {
//        ConnectionDTO removeConnection = null;
//        for (ConnectionDTO connection : connections) {
//            if (connection.getSessionId().equals(sessionId)) {
//                removeConnection = connection;
//                break;
//            }
//        }
//        if (null != removeConnection) {
//            WebSocketSession session = removeConnection.getWebSocketSession();
//            if (session.isOpen()) {
//                try {
//                    session.close();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                    return false;
//                }
//                connections.remove(removeConnection);
//            }
//        }
        return true;
    }

    private List<ConnectionDTO> getConnections(List<String> userNames, List<String> connectionTypes) {
        List<ConnectionDTO> res = new ArrayList<>();
//        for (ConnectionDTO connection : connections) {
//            if (userNames.contains(connection.getUserName())
//                    && connectionTypes.contains(connection.getConnectionType())) {
//                res.add(connection);
//            }
//        }
        return res;
    }


    private List<ConnectionDTO> getConnections(String userName, List<String> connectionTypes) {
        List<String> userNames = new ArrayList<>();
        userNames.add(userName);
        return this.getConnections(userNames, connectionTypes);
    }

    private List<ConnectionDTO> getConnections(List<String> userNames, String connectionType) {
        List<String> connectionTypes = new ArrayList<>();
        connectionTypes.add(connectionType);
        return this.getConnections(userNames, connectionTypes);
    }

    private List<ConnectionDTO> getConnections(String userName, String connectionType) {
        List<String> connectionTypes = new ArrayList<>();
        connectionTypes.add(connectionType);
        return this.getConnections(userName, connectionTypes);
    }

    /**
     * @param userName
     * @param message
     * @return Is success to send the message to user
     */
    private boolean sendMessageToUser(String userName, String connectionType, TextMessage message) {
//        if (Utils.stringNotEmpty(userName)) {
//            logger.debug("User name is null");
//            return false;
//        }
//        if (Utils.stringNotEmpty(connectionType)) {
//            connectionType = Constants.CONNECTION_TYPE_MONITOR;
//        }
//        List<ConnectionDTO> connections = this.getConnections(userName, connectionType);
//        if (Utils.listNotNull(connections)) {
//            for (ConnectionDTO connection : connections) {
//                WebSocketSession session = connection.getWebSocketSession();
//                this.sendMessageToSession(session, message);
//            }
//            return true;
//        } else {
//            logger.debug("Cannot find any session depends on user:" + userName + " and connection type:" + connectionType);
//            return false;
//        }
    	return false;
    }

    public boolean sendMessageToUser(List<String> userNames, List<String> connectionTypes, TextMessage message) {
        List<ConnectionDTO> connections = this.getConnections(userNames, connectionTypes);
        if (Utils.listNotNull(connections)) {
            for (ConnectionDTO connection : connections) {
                WebSocketSession session = connection.getWebSocketSession();
                this.sendMessageToSession(session, message);
            }
            return true;
        } else {
            logger.debug("Cannot find any session depends on these users and connection types");
            return false;
        }
    }

    private boolean sendMessageToSession(WebSocketSession session, TextMessage message) {
        try {
            if (session.isOpen()) {
                session.sendMessage(message);
                return true;
            } else {
                return false;
            }
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public void replyMessage(String connectionType,String subType,String userId) throws IOException {
//        if (!Utils.stringNotEmpty(connectionType)) {
//            connectionType = Constants.CONNECTION_TYPE_MONITOR;
//        }
//        if (!Utils.stringNotEmpty(subType)) {
//            subType = "";
//        }
//        List<Notification> replyNotifications =
//                notificationMapper.selectWithDetail(
//                        userId,connectionType,subType,Constants.MONITOR_STATUS_ACTIVED,null);
//        List<Long> effectedNotificationIds = new ArrayList<>();
//        if(Utils.listNotNull(replyNotifications)){
//            for (Notification replyNotification : replyNotifications) {
//                if (Constants.COMPLETE_TYPE_AUTO.equals(replyNotification.getCompleteType())) {
//                    effectedNotificationIds.add(replyNotification.getId());
//                    replyNotification.setStatus(Constants.MONITOR_STATUS_COMPLETED);
//                    notificationMapper.updateByPrimaryKey(replyNotification);
//                }
//            }
//        }
//        if (!Utils.listNotNull(effectedNotificationIds)) {
//            return;
//        }
//        List<String> effectedUserIds = new ArrayList<>();
//        List<Notification> effectedNotifications =
//                notificationMapper.selectWithDetail(
//                        null, null, null, null, effectedNotificationIds);
//        for (Notification effectedNotification : effectedNotifications) {
//            List<NotificationUser> effectedNotificationUsers = effectedNotification.getNotificationUserList();
//            if (Utils.listNotNull(effectedNotificationUsers)) {
//                for (NotificationUser effectedNotificationUser : effectedNotificationUsers) {
//                    if (!effectedUserIds.contains(effectedNotificationUser.getUserId())) {
//                        effectedUserIds.add((effectedNotificationUser.getUserId()));
//                    }
//                }
//            }
//        }
//        this.refreshMessage(effectedUserIds, connectionType);
    }

    public void activeConnection(WebSocketSession session, String userName, String connectionType) throws IOException {
//        if (!Utils.stringNotEmpty(userName)) {
//            logger.debug("Cannot get the user name, connection closed");
//            if (session.isOpen()) {
//                session.close();
//            }
//            session.sendMessage(new TextMessage("Server:Cannot get the user name, connection closed"));
//            return;
//        }
//        if(!Utils.stringNotEmpty(connectionType)){
//            connectionType = Constants.CONNECTION_TYPE_MONITOR;
//        }
//        ConnectionDTO connection = new ConnectionDTO(session.getId(), userName, connectionType, session);
//        connections.add(connection);
//        this.refreshConnection(connection);
    }

}
