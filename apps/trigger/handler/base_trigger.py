# coding=utf-8


from abc import ABC, abstractmethod


class BaseTrigger(ABC):
    """
    触发器抽象
    """

    @abstractmethod
    def support(self, trigger, **kwargs):
        pass

    @abstractmethod
    def deploy(self, trigger, **kwargs):
        pass

    @abstractmethod
    def undeploy(self, trigger, **kwargs):
        pass

    @staticmethod
    @abstractmethod
    def execute(trigger, **kwargs):
        pass
