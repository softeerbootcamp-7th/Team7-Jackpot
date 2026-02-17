package com.jackpot.narratix.domain.service;

import com.jackpot.narratix.domain.entity.UploadFile;
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

    @Transactional
    public void saveExtractSuccess(String fileId, String extractedText) {
        UploadFile file = uploadFileRepository.findById(fileId).orElse(null);

        if (file == null) return;

        file.successExtract(extractedText);
        log.info("Extract success saved. FileId = {}", fileId);
    }

    @Transactional
    public void saveExtractFail(String fileId, String errorMassage) {
        UploadFile file = uploadFileRepository.findById(fileId).orElse(null);

        if (file == null) return;

        file.failExtract();
        log.info("Extract fail saved. FileId = {} , error : {}", fileId, errorMassage);
    }

    @Transactional
    public void saveLabelingSuccess(String fileId, String labelingJson) {
        UploadFile file = uploadFileRepository.findById(fileId).orElse(null);

        if (file == null) return;

        file.successLabeling(labelingJson);
        log.info("AI Labeling success saved. FileID: {}", fileId);
    }

    @Transactional
    public void saveLabelingFail(String fileId) {
        UploadFile file = uploadFileRepository.findById(fileId).orElse(null);

        if (file == null) return;

        file.failLabeling();
        log.error("AI Labeling Fail saved. FileID: {}", fileId);
    }
}
