package com.jackpot.narratix.domain.service;

import com.jackpot.narratix.domain.repository.UploadFileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileProcessService {

    private final UploadFileRepository uploadFileRepository;
    private final AiLabelingService aiLabelingService;

    @Transactional
    public void processUploadedFile(String fileId, String extractedText) {
        uploadFileRepository.findById(fileId).ifPresentOrElse(
                file -> {
                    file.successExtract(extractedText);
                    log.info("Extract text saved.FileID: {}", fileId);

                    try {
                        String jsonResult = aiLabelingService.aiAnalyze(extractedText);

                        file.successLabeling(jsonResult);
                        log.info("AI Labeling Completed. FileID: {}", fileId);

                    } catch (Exception e) {
                        log.error("AI Labeling Failed. FileID: {}", fileId, e);
                        file.failLabeling();

                    }
                },
                () -> log.error("Error: File not found for ID: {}. Skipping process.", fileId)
        );
    }

    @Transactional
    public void processFailedFile(String fileId, String errorMessage) {
        uploadFileRepository.findById(fileId).ifPresentOrElse(
                file -> {
                    file.failExtract();
                    log.info("File processing failed. FileID: {}, Reason: {}", fileId, errorMessage);
                },
                () -> log.error("Error: File not found for ID: {}. Skipping process.", fileId)
        );
    }
}
