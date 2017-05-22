package com.zbin.coachtalk.common.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;

public class DateUtil {
    public static String formatDate(Date date, String format) {

        if (date != null) {
            String time;
            SimpleDateFormat formater = new SimpleDateFormat(format);
            time = formater.format(date);
            return time;
        } else {
            return "";
        }

    }

    public  static Date formatString(String date, String format) throws ParseException {

        if (StringUtils.isNotBlank(date)) {
            Date time;
            SimpleDateFormat formater = new SimpleDateFormat(format);
            time = formater.parse(date);
            return time;
        } else {
            return null;
        }

    }
}
