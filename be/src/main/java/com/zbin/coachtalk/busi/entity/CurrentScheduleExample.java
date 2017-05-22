package com.zbin.coachtalk.busi.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class CurrentScheduleExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public CurrentScheduleExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        protected void addCriterionForJDBCDate(String condition, Date value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            addCriterion(condition, new java.sql.Date(value.getTime()), property);
        }

        protected void addCriterionForJDBCDate(String condition, List<Date> values, String property) {
            if (values == null || values.size() == 0) {
                throw new RuntimeException("Value list for " + property + " cannot be null or empty");
            }
            List<java.sql.Date> dateList = new ArrayList<java.sql.Date>();
            Iterator<Date> iter = values.iterator();
            while (iter.hasNext()) {
                dateList.add(new java.sql.Date(iter.next().getTime()));
            }
            addCriterion(condition, dateList, property);
        }

        protected void addCriterionForJDBCDate(String condition, Date value1, Date value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            addCriterion(condition, new java.sql.Date(value1.getTime()), new java.sql.Date(value2.getTime()), property);
        }

        public Criteria andCoachPhonenumIsNull() {
            addCriterion("coach_phonenum is null");
            return (Criteria) this;
        }

        public Criteria andCoachPhonenumIsNotNull() {
            addCriterion("coach_phonenum is not null");
            return (Criteria) this;
        }

        public Criteria andCoachPhonenumEqualTo(String value) {
            addCriterion("coach_phonenum =", value, "coachPhonenum");
            return (Criteria) this;
        }

        public Criteria andCoachPhonenumNotEqualTo(String value) {
            addCriterion("coach_phonenum <>", value, "coachPhonenum");
            return (Criteria) this;
        }

        public Criteria andCoachPhonenumGreaterThan(String value) {
            addCriterion("coach_phonenum >", value, "coachPhonenum");
            return (Criteria) this;
        }

        public Criteria andCoachPhonenumGreaterThanOrEqualTo(String value) {
            addCriterion("coach_phonenum >=", value, "coachPhonenum");
            return (Criteria) this;
        }

        public Criteria andCoachPhonenumLessThan(String value) {
            addCriterion("coach_phonenum <", value, "coachPhonenum");
            return (Criteria) this;
        }

        public Criteria andCoachPhonenumLessThanOrEqualTo(String value) {
            addCriterion("coach_phonenum <=", value, "coachPhonenum");
            return (Criteria) this;
        }

        public Criteria andCoachPhonenumLike(String value) {
            addCriterion("coach_phonenum like", value, "coachPhonenum");
            return (Criteria) this;
        }

        public Criteria andCoachPhonenumNotLike(String value) {
            addCriterion("coach_phonenum not like", value, "coachPhonenum");
            return (Criteria) this;
        }

        public Criteria andCoachPhonenumIn(List<String> values) {
            addCriterion("coach_phonenum in", values, "coachPhonenum");
            return (Criteria) this;
        }

        public Criteria andCoachPhonenumNotIn(List<String> values) {
            addCriterion("coach_phonenum not in", values, "coachPhonenum");
            return (Criteria) this;
        }

        public Criteria andCoachPhonenumBetween(String value1, String value2) {
            addCriterion("coach_phonenum between", value1, value2, "coachPhonenum");
            return (Criteria) this;
        }

        public Criteria andCoachPhonenumNotBetween(String value1, String value2) {
            addCriterion("coach_phonenum not between", value1, value2, "coachPhonenum");
            return (Criteria) this;
        }

        public Criteria andWorkdayIsNull() {
            addCriterion("workday is null");
            return (Criteria) this;
        }

        public Criteria andWorkdayIsNotNull() {
            addCriterion("workday is not null");
            return (Criteria) this;
        }

        public Criteria andWorkdayEqualTo(Date value) {
            addCriterionForJDBCDate("workday =", value, "workday");
            return (Criteria) this;
        }

        public Criteria andWorkdayNotEqualTo(Date value) {
            addCriterionForJDBCDate("workday <>", value, "workday");
            return (Criteria) this;
        }

        public Criteria andWorkdayGreaterThan(Date value) {
            addCriterionForJDBCDate("workday >", value, "workday");
            return (Criteria) this;
        }

        public Criteria andWorkdayGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("workday >=", value, "workday");
            return (Criteria) this;
        }

        public Criteria andWorkdayLessThan(Date value) {
            addCriterionForJDBCDate("workday <", value, "workday");
            return (Criteria) this;
        }

        public Criteria andWorkdayLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("workday <=", value, "workday");
            return (Criteria) this;
        }

        public Criteria andWorkdayIn(List<Date> values) {
            addCriterionForJDBCDate("workday in", values, "workday");
            return (Criteria) this;
        }

        public Criteria andWorkdayNotIn(List<Date> values) {
            addCriterionForJDBCDate("workday not in", values, "workday");
            return (Criteria) this;
        }

        public Criteria andWorkdayBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("workday between", value1, value2, "workday");
            return (Criteria) this;
        }

        public Criteria andWorkdayNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("workday not between", value1, value2, "workday");
            return (Criteria) this;
        }

        public Criteria andMiddayIdIsNull() {
            addCriterion("midday_id is null");
            return (Criteria) this;
        }

        public Criteria andMiddayIdIsNotNull() {
            addCriterion("midday_id is not null");
            return (Criteria) this;
        }

        public Criteria andMiddayIdEqualTo(Short value) {
            addCriterion("midday_id =", value, "middayId");
            return (Criteria) this;
        }

        public Criteria andMiddayIdNotEqualTo(Short value) {
            addCriterion("midday_id <>", value, "middayId");
            return (Criteria) this;
        }

        public Criteria andMiddayIdGreaterThan(Short value) {
            addCriterion("midday_id >", value, "middayId");
            return (Criteria) this;
        }

        public Criteria andMiddayIdGreaterThanOrEqualTo(Short value) {
            addCriterion("midday_id >=", value, "middayId");
            return (Criteria) this;
        }

        public Criteria andMiddayIdLessThan(Short value) {
            addCriterion("midday_id <", value, "middayId");
            return (Criteria) this;
        }

        public Criteria andMiddayIdLessThanOrEqualTo(Short value) {
            addCriterion("midday_id <=", value, "middayId");
            return (Criteria) this;
        }

        public Criteria andMiddayIdIn(List<Short> values) {
            addCriterion("midday_id in", values, "middayId");
            return (Criteria) this;
        }

        public Criteria andMiddayIdNotIn(List<Short> values) {
            addCriterion("midday_id not in", values, "middayId");
            return (Criteria) this;
        }

        public Criteria andMiddayIdBetween(Short value1, Short value2) {
            addCriterion("midday_id between", value1, value2, "middayId");
            return (Criteria) this;
        }

        public Criteria andMiddayIdNotBetween(Short value1, Short value2) {
            addCriterion("midday_id not between", value1, value2, "middayId");
            return (Criteria) this;
        }

        public Criteria andWorkFlagIsNull() {
            addCriterion("work_flag is null");
            return (Criteria) this;
        }

        public Criteria andWorkFlagIsNotNull() {
            addCriterion("work_flag is not null");
            return (Criteria) this;
        }

        public Criteria andWorkFlagEqualTo(Short value) {
            addCriterion("work_flag =", value, "workFlag");
            return (Criteria) this;
        }

        public Criteria andWorkFlagNotEqualTo(Short value) {
            addCriterion("work_flag <>", value, "workFlag");
            return (Criteria) this;
        }

        public Criteria andWorkFlagGreaterThan(Short value) {
            addCriterion("work_flag >", value, "workFlag");
            return (Criteria) this;
        }

        public Criteria andWorkFlagGreaterThanOrEqualTo(Short value) {
            addCriterion("work_flag >=", value, "workFlag");
            return (Criteria) this;
        }

        public Criteria andWorkFlagLessThan(Short value) {
            addCriterion("work_flag <", value, "workFlag");
            return (Criteria) this;
        }

        public Criteria andWorkFlagLessThanOrEqualTo(Short value) {
            addCriterion("work_flag <=", value, "workFlag");
            return (Criteria) this;
        }

        public Criteria andWorkFlagIn(List<Short> values) {
            addCriterion("work_flag in", values, "workFlag");
            return (Criteria) this;
        }

        public Criteria andWorkFlagNotIn(List<Short> values) {
            addCriterion("work_flag not in", values, "workFlag");
            return (Criteria) this;
        }

        public Criteria andWorkFlagBetween(Short value1, Short value2) {
            addCriterion("work_flag between", value1, value2, "workFlag");
            return (Criteria) this;
        }

        public Criteria andWorkFlagNotBetween(Short value1, Short value2) {
            addCriterion("work_flag not between", value1, value2, "workFlag");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNull() {
            addCriterion("update_time is null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNotNull() {
            addCriterion("update_time is not null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeEqualTo(Date value) {
            addCriterion("update_time =", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotEqualTo(Date value) {
            addCriterion("update_time <>", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThan(Date value) {
            addCriterion("update_time >", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("update_time >=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThan(Date value) {
            addCriterion("update_time <", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThanOrEqualTo(Date value) {
            addCriterion("update_time <=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIn(List<Date> values) {
            addCriterion("update_time in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotIn(List<Date> values) {
            addCriterion("update_time not in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeBetween(Date value1, Date value2) {
            addCriterion("update_time between", value1, value2, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotBetween(Date value1, Date value2) {
            addCriterion("update_time not between", value1, value2, "updateTime");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}