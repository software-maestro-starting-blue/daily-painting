package com.startingblue.dailypainting.ai.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;

public interface SynarioService {

    JsonNode sendDiaryToLLM(final String diaryContent);

}
