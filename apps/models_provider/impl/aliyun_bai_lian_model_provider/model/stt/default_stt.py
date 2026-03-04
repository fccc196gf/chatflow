# coding=utf-8

import os
from typing import Dict

from models_provider.base_model_provider import CHATFLOWBaseModel

from models_provider.impl.base_stt import BaseSpeechToText


class AliyunBaiLianDefaultSpeechToText(CHATFLOWBaseModel, BaseSpeechToText):
    def check_auth(self):
        pass

    def speech_to_text(self, audio_file):
        pass

    @staticmethod
    def is_cache_model():
        return False

    @staticmethod
    def new_instance(
        model_type, model_name, model_credential: Dict[str, object], **model_kwargs
    ):
        from models_provider.impl.aliyun_bai_lian_model_provider.model.stt import (
            AliyunBaiLianOmiSpeechToText,
            AliyunBaiLianSpeechToText,
            AliyunBaiLianAsrSpeechToText,
        )

        stt_type = model_credential.get("type")
        if stt_type == "qwen":
            return AliyunBaiLianAsrSpeechToText(
                model=model_name,
                api_key=model_credential.get("api_key"),
                api_url=model_credential.get("api_url"),
                params=model_kwargs,
                **model_kwargs,
            )
        elif stt_type == "omni":
            return AliyunBaiLianOmiSpeechToText(
                model=model_name,
                api_key=model_credential.get("api_key"),
                api_url=model_credential.get("api_url"),
                params=model_kwargs,
                **model_kwargs,
            )
        else:
            return AliyunBaiLianSpeechToText(
                model=model_name,
                api_key=model_credential.get("api_key"),
                params=model_kwargs,
                **model_kwargs,
            )
