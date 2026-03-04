#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from typing import Dict

from models_provider.base_model_provider import CHATFLOWBaseModel
from models_provider.impl.base_chat_open_ai import BaseChatOpenAI


class DeepSeekChatModel(CHATFLOWBaseModel, BaseChatOpenAI):

    @staticmethod
    def is_cache_model():
        return False

    @staticmethod
    def new_instance(
        model_type, model_name, model_credential: Dict[str, object], **model_kwargs
    ):
        optional_params = CHATFLOWBaseModel.filter_optional_params(model_kwargs)

        deepseek_chat_open_ai = DeepSeekChatModel(
            model=model_name,
            openai_api_base=model_credential.get("api_base")
            or "https://api.deepseek.com",
            openai_api_key=model_credential.get("api_key"),
            extra_body=optional_params,
        )
        return deepseek_chat_open_ai
