package com.zbin.coachtalk.common;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Constants {
    public static final String USER_NAME = "userName";
    public static final String WEBSOCKET_USERNAME = "webSocketUserName";
    public static final String CONNECTION_TYPE = "connectionType";
    public static final String WEBSOCKET_CONNECTION_TYPE = "webSocketConnectionType";
    public static final String CONNECTION_TYPE_MONITOR = "monitor";

    private static final GsonBuilder GSON_BUILDER = new GsonBuilder();
    public static final Gson GSON = GSON_BUILDER.create();

    public static final String SUP_NAME = "服务商";
}
