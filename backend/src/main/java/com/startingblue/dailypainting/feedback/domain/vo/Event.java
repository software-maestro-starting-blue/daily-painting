package com.startingblue.dailypainting.feedback.domain.vo;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public final class Event {

    private static final String UNKNOWN = "UNKNOWN";

    private boolean isEventAgreed;

    private String phoneNumber;

    private Event(final boolean isEventAgreed, final String phoneNumber) {
        this.isEventAgreed = isEventAgreed;
        this.phoneNumber = phoneNumber;
    }

    public static Event createEventPhoneNumberWithAgreeOrUnknown(final boolean isEventAgreed, final String phoneNumber) {
        if(isEventAgreed){
            return new Event(true, phoneNumber);
        }
        return new Event(false, UNKNOWN);
    }
}
