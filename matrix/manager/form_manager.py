from wtforms import DecimalField, Form, FieldList, IntegerField, RadioField, StringField, validators

from matrix.constants.constants import OPERATORS


class OperationForm(Form):
    matrix_1 = FieldList(DecimalField('matrix_1', validators.required()))
    matrix_2 = FieldList(DecimalField('matrix_2'))
    matrix_1_param = FieldList(IntegerField('matrix_1_param', validators.required()))
    matrix_2_param = FieldList(IntegerField('matrix_1_param'))
    operator = RadioField("operator", choices=OPERATORS)
    csrf_token = StringField("x-csrf", validators.required())
