package com.startingblue.dailypainting.ai.service;

import org.springframework.stereotype.Service;

@Service
public interface VisionService {

    String sendSynopsisToVision(final String visionPrompt);

}
