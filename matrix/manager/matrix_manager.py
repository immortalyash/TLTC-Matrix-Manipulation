import numpy as np


class MatrixManager(object):
    MATRIX_1 = None
    MATRIX_2 = None

    def __init__(self, matrix_1, matrix_1_param, matrix_2=None, matrix_2_param=None):
        """
        Constructor to initial matrix for operations
        :param matrix_1: List[List[int]]
        :param matrix_2: List[List[int]]
        """
        # Convert list to numpy array and reshape matrix to required form
        matrix_1 = np.array(matrix_1)
        matrix_1 = matrix_1.reshape(matrix_1_param[0], matrix_1_param[1])

        # Check if matrix 2 exist before performing operations
        if matrix_2:
            matrix_2 = np.array(matrix_2)
            matrix_2 = matrix_2.reshape(matrix_2_param[0], matrix_2_param[1])

        # Assign variables
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
        # Check Matrix 2 exist
        if self._get_matrix_2() is None:
            return False, "matrix 2 is required field"

        # Perform required operation
        return True, self._get_matrix_1() + self._get_matrix_2()

    def subtract(self):
        """
        Method to subtract two matrix
        :return: List[List[int]]
        """
        # Check Matrix 2 exist
        if self._get_matrix_2() is None:
            return False, "matrix 2 is required field"

        # Perform required operation
        return True, self._get_matrix_1() - self._get_matrix_2()

    def multiplication(self):
        """
        Method to multiple two matrix
        :return: List[List[int]]
        """
        # Check Matrix 2 exist
        if self._get_matrix_2() is None:
            return False, "matrix 2 is required field"
        else:
            # Check for Matrix_1(rows, columns) with Matrix_2(columns, rows)
            matrix_1_shape = self._get_matrix_1().shape
            matrix_2_shape = self._get_matrix_2().shape

            if matrix_1_shape[1] != matrix_2_shape[0]:
                return False, "matrix 1 column size doesn't match with matrix 2 row size."

        # Perform required operation
        return True, self._get_matrix_1() @ self._get_matrix_2()

    def transpose(self):
        """
        Method to transpose matrix
        :return: List[List[int]]
        """
        # Perform required operation
        return True, self._get_matrix_1().transpose()
