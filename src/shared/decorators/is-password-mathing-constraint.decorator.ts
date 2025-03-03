import {
  ValidatorConstraint,
  type ValidationArguments,
  type ValidatorConstraintInterface,
} from 'class-validator';
import { NewPasswordInput } from 'src/modules/auth/password-recovery/inputs/new-password.input';

@ValidatorConstraint({ name: 'IsPasswordMathing', async: false })
export class IsPasswordMathingConstraint
  implements ValidatorConstraintInterface
{
  public validate(passwordRepeat: string, args?: ValidationArguments) {
    const object = args.object as NewPasswordInput;

    return object.password === passwordRepeat;
  }

  public defaultMessage?(validationArguments?: ValidationArguments) {
    return 'Пароли не совпадают';
  }
}
