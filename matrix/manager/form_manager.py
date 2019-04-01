import copy

from wtforms import Form, FieldList, IntegerField, RadioField, StringField, validators, ValidationError

from matrix.constants.constants import OPERATORS, OPERATORS_BOTH_MATRIX_REQUIREMENT


class OperationForm(Form):
    matrix_1_param = FieldList(IntegerField("matrix_1_param"), validators=[validators.DataRequired()])
    matrix_2_param = FieldList(IntegerField("matrix_2_param"))
    matrix_1 = FieldList(IntegerField("matrix_1", validators=[validators.DataRequired()]))
    matrix_2 = FieldList(IntegerField("matrix_2"))
    operator = RadioField("operator", choices=OPERATORS)
    csrf_token = StringField("x-csrf")

    def validate_matrix_1(self, field):
        """
        Check for validation, if data present
        :param field: dict
        """
        message = None

        # Check if data is available
        if field.data:

            # Check for matrix params (rows and columns size) are available
            if self.matrix_1_param.data:
                _params = self.matrix_1_param.data

                # Check if rows and columns are of int type
                # If yes then check for product of it with respect to size of matrix
                if type(_params[0]) is int and type(_params[1]) is int:
                    _size_required = _params[0] * _params[1]

                    # Check for product size mismatch
                    if len(field.data) != _size_required:
                        message = field.gettext("Product of rows and columns doesn't match length of matrix.")
        else:
            # Required field
            message = field.gettext("This field is required.")

        # Raise error if message available
        if message:
            raise ValidationError(message)

    def validate_matrix_1_param(self, field):
        """
        Check for length of params
        :param field: dict
        """
        message = None

        # Exact two parameters are required
        if 0 > len(field.data) or len(field.data) > 2:
            message = field.gettext("Two elements required.")
        else:
            # Check for data types
            if not field.data[0] and not field.data[1]:
                message = field.gettext("Invalid dataType.")

        # Raise error if message available
        if message:
            raise ValidationError(message)

    def validate_matrix_2(self, field):
        """
        Check for validation, if data present
        :param field: dict
        """
        message = None

        # Check if data is available, since optional field
        if field.data:

            # Check for matrix params (rows and columns size) are available, since optional field
            if self.matrix_2_param.data:
                _params = self.matrix_2_param.data

                # Check if rows and columns are of int type
                # If yes then check for product of it with respect to size of matrix
                if type(_params[0]) is int and type(_params[1]) is int:
                    _size_required = _params[0] * _params[1]

                    # Check for product size mismatch
                    if len(field.data) != _size_required:
                        message = field.gettext("Product of rows and columns doesn't match length of matrix.")

        # Raise error if message available
        if message:
            raise ValidationError(message)

    def validate_matrix_2_param(self, field):
        """
        Check length if data is available
        :param field: dict
        """
        message = None

        # Check if data is available, since optional field
        if field.data:

            # Check for matrix params (rows and columns size) are available, since optional field
            if self.matrix_2.data:
                if 0 > len(field.data) or len(field.data) > 2:
                    message = field.gettext("Two elements required.")
                else:
                    # Check for data types
                    if not field.data[0] and not field.data[1]:
                        message = field.gettext("Invalid dataType.")

            else:
                # Extra inputs, if matrix 2 not sent
                if 0 > len(field.data) or len(field.data) > 2:
                    message = field.gettext("Corresponding matrix not available.")

        else:
            # Matrix 2 param required, if matrix 2 is available
            if self.matrix_2.data:
                message = field.gettext("This field is required with matrix_2")

        # Raise error if message available
        if message:
            raise ValidationError(message)

    def validate_operator(self, field):
        """
        Check if matrix is available for required operation
        :param field: dict
        """
        message = None

        # Check if data is available,
        if field.data:
            _ops = OPERATORS_BOTH_MATRIX_REQUIREMENT
            # Check if operation needs both matrix or only one
            if field.data in _ops:

                # Check if matrix_2 is required for current operation
                if not self.matrix_2:
                    message = field.gettext("matrix_2 is required for selected operation.")

                # Check for rows and columns size requirement depending on operation.
                if field.data == "MUL":
                    # Check if matrix 1 column size corresponds to matrix 2 row size
                    if self.matrix_1_param.data and self.matrix_2_param.data:
                        if self.matrix_1_param.data[1] != self.matrix_2_param.data[0]:
                            message = field.gettext("matrix 1 column size doesn't match with matrix 2 row size.")
                else:
                    # Check if size of both matrix is same
                    if self.matrix_1_param.data and self.matrix_2_param.data:
                        if self.matrix_1_param.data != self.matrix_2_param.data:
                            message = field.gettext("matrix 1 and matrix 2 rows and columns size should be same.")

        # Raise error if message available
        if message:
            raise ValidationError(message)
