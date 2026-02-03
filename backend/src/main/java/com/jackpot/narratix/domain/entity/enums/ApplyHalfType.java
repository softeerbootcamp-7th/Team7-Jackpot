package com.jackpot.narratix.domain.entity.enums;

import java.time.LocalDate;

public enum ApplyHalfType {
    FIRST_HALF, SECOND_HALF;

    public static ApplyHalfType caculateApplyHalfType(LocalDate date) {
        if (date.getMonthValue() <= 6) return FIRST_HALF;
        return SECOND_HALF;
    }
}
