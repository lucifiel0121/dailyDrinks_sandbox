import { Component, OnInit } from '@angular/core';
import { DailyDrinksService } from './daily-drinks.service';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-daily-drinks',
  templateUrl: './daily-drinks.component.html',
  styleUrls: ['./daily-drinks.component.scss'],
})
export class DailyDrinksComponent implements OnInit {
  orderDetails: {
    name: string;
    price: number;
    note: string;
    isReadonly: boolean;
    drinkDetails: { drink: string; sugar: string };
  }[];

  constructor(private dailyDrinksService: DailyDrinksService, private formBuilder: FormBuilder) {}

  /*angular feature: form control (formArray) */
  displayForm = this.formBuilder.group({
    inputFormArray: this.formBuilder.array([]),
  });

  /*angular feature: form control (formBuilder) */
  orderForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    note: '',
    drinkDetails: this.formBuilder.group({
      drink: ['', Validators.required],
      sugar: ['', Validators.required],
    }),
  });

  ngOnInit() {
    /** deep copy from service (likes get API) */
    this.orderDetails = JSON.parse(JSON.stringify(this.dailyDrinksService.orderInfo)).map(x => {
      x.isReadonly = true;
      return x;
    });

    this.patchFormArrayValue();
  }

  /**
   * @description 透過 getter 改值, 產生 form array 實例
   * @description 用 getter 控制 formArrayInstance
   */
  get formArrayInstance() {
    return this.displayForm.get('inputFormArray') as FormArray;
  }
  inputForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      note: '',
      drinkDetails: this.formBuilder.group({
        drink: ['', Validators.required],
        sugar: ['', Validators.required],
      }),
    });
  }
  withPatchValue(initValue): FormGroup {
    return this.formBuilder.group({
      name: initValue.name,
      price: +initValue.price,
      note: initValue.note,
      drinkDetails: this.formBuilder.group({
        drink: initValue.drinkDetails.drink,
        sugar: initValue.drinkDetails.sugar,
      }),
    });
  }

  /**
   * @description 新增 : 有 initValue => withPatchValue
   */
  addInputForm(initValue = false) {
    if (initValue) {
      this.formArrayInstance.push(this.withPatchValue(initValue));
    } else {
      this.formArrayInstance.push(this.inputForm());
    }
  }

  /**
   * @description 刪除 : 要同時刪除 orderDetail(畫面) && formGroupName(資料)
   */
  remove(index) {
    this.formArrayInstance.removeAt(index);
    this.orderDetails.splice(index, 1);
  }
  /** 更新 */
  patchFormArrayValue() {
    /* Data =>  formArrayInstance */
    this.orderDetails.forEach((item, index) => {
      this.addInputForm();
      /* 更新 每個 formArrayInstance */
      this.formArrayInstance.controls[index].patchValue({
        name: item.name,
        price: item.price,
        note: item.note,
        drinkDetails: {
          drink: item.drinkDetails.drink,
          sugar: item.drinkDetails.sugar,
        },
      });
    });
  }

  keepFunctionDoPatchAPI(isFinish) {
    if (isFinish) {
      console.log('keepFunctionDoPatchAPI');
    }
  }

  /* 表單提交 */
  onSubmit(customerData) {
    /* push : form array */
    this.addInputForm(customerData);
    /* push :   畫面綁定 */
    customerData.isReadonly = true;
    this.orderDetails.push(customerData);

    this.orderForm.reset();
  }

  listForAPIResponse() {
    console.log(this.displayForm.value);
  }
}
