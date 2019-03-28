import numpy as np


class MatrixManager(object):
    MATRIX_1 = None
    MATRIX_2 = None

    def __init__(self, matrix_1, matrix_2):
        """
        Constructor to initial matrix for operations
        :param matrix_1: List[List[int]]
        :param matrix_2: List[List[int]]
        """
        self.MATRIX_1 = matrix_1
        self.MATRIX_2 = matrix_2

    def _get_matrix_1(self):
        """
        Getter method matrix 1
        :return: List[List[int]]
        """
        return self.MATRIX_1

    def _get_matrix_2(self):
        """
        Getter method matrix 2
        :return:
        """
        return self.MATRIX_2

    def add(self):
        """
        Method to add two matrix
        :return: List[List[int]]
        """

    def subtract(self):
        """
        Method to subtract two matrix
        :return: List[List[int]]
        """

    def multiplication(self):
        """
        Method to multiple two matrix
        :return: List[List[int]]
        """