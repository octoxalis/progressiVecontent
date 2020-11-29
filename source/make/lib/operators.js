
module.exports =
{
  add__n:
  (
    op1_n,
    op2_n
  ) => op1_n + op2_n
,



  substract__n:
  (
    op1_n,
    op2_n
  ) => op1_n - op2_n
,



  multiply__n:
  (
    op1_n,
    op2_n
  ) => op1_n * op2_n
,



  divide__n:
  (
    op1_n,
    op2_n
  ) => op2_n !== 0 ? op1_n / op2_n : 0
,



  modulo__n:
  (
    op1_n,
    op2_n
  ) => op1_n % op2_n
,

}
