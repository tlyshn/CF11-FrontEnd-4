import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder } from '@angular/forms';
import { Vouchers } from '../vouchers'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
	items;
  voucherForm;
  voucherRedeemed = false;
  voucherPercent = 0;
  courseItems = this.cartService.courseItems;
  courseSum = 0;
  courseSumOriginal = 0;
  Vouchers = Vouchers;

  checkoutForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    age: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(2),]),
    email:new FormControl('',[Validators.required,Validators.email]),
    address:new FormControl('',Validators.required),
  });

  constructor(private cartService: CartService, private formBuilder: FormBuilder) { 
    this.voucherForm = this.formBuilder.group({
    voucher: '',
})
  }

  ngOnInit(): void {
    this.items = this.cartService.getCourseItems();
    for(let i = 0; i < this.courseItems.length; i++){
      this.courseSum += this.courseItems[i].price;
      this.courseSumOriginal = this.courseSum;
    }
  }

  onVoucherSubmit(userVoucher) {
    console.log(userVoucher);
    console.log(Vouchers);

    if(this.voucherRedeemed == false){
      if (userVoucher.voucher === Vouchers.TENPERCENT || userVoucher.voucher === Vouchers.TWENTYPERCENT || userVoucher.voucher === Vouchers.THIRTYPERCENT || userVoucher.voucher === Vouchers.FOURTYPERCENT) {
      window.alert(`Your ${userVoucher.voucher} voucher has been redeemed!`)
      console.log(this.onVoucher(userVoucher));
      this.voucherForm.reset();
      } else {
        window.alert("The voucher you entered is not valid! Please enter the correct code or continue without redeeming a voucher.")
      }   
    } else {
        window.alert("You already redeemed a voucher.");
        this.voucherForm.reset();
    }
  }

   onSubmit(customerData) {
    if(this.checkoutForm.valid){
      // Process checkout data here
      console.warn('Your order has been submitted', customerData);
      this.items = this.cartService.clearCart();
      this.checkoutForm.reset();
 }
}

  onVoucher(userVoucher) {
    
    switch (userVoucher.voucher) {
      case Vouchers.TENPERCENT:
        this.courseSum = this.courseSum * 0.9;
        // console.log(this.courseSum);
        this.voucherRedeemed = true;
        this.voucherPercent = 10;
        break;
       
      case Vouchers.TWENTYPERCENT:
        this.courseSum = this.courseSum * 0.8;
        // console.log(this.courseSum);
        this.voucherRedeemed = true;
        this.voucherPercent = 20;
        break;
       
      case Vouchers.THIRTYPERCENT:
        this.courseSum = this.courseSum * 0.7;
        // console.log(this.courseSum);
        this.voucherRedeemed = true;
        this.voucherPercent = 30;
        break;
       
      case Vouchers.FOURTYPERCENT:
        this.courseSum = this.courseSum * 0.6;
        // console.log(this.courseSum);
        this.voucherRedeemed = true;
        this.voucherPercent = 40;
        break;
       
      default:
        this.courseSum = this.courseSum;
        // console.log(this.courseSum);
        this.voucherPercent = 0;
        break;
      }
    }
  }

