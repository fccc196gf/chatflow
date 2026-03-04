# coding=utf-8

from abc import ABC, abstractmethod


class BaseTriggerTask(ABC):
    """
    任务执行器抽象
    """

    @abstractmethod
    def support(self, trigger_task, **kwargs):
        pass

    @abstractmethod
    def execute(self, trigger_task, **kwargs):
        pass
