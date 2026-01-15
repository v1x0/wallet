import "@nf-internal/chunk-4CLCTAJ7";
import { CurrencyPipe as c, NgClass as f } from "@angular/common";
import * as e from "@angular/core";
import { inject as m } from "@angular/core";
import { MatCard as g, MatCardHeader as C, MatCardTitle as M, MatCardSubtitle as y, MatCardTitleGroup as v } from "@angular/material/card";
import * as n from "@angular/forms";
import { FormsModule as x, ReactiveFormsModule as b } from "@angular/forms";
import * as d from "@angular/material/dialog";
import { MatDialogRef as D, MAT_DIALOG_DATA as E, MatDialogModule as A } from "@angular/material/dialog";
import * as r from "@angular/material/form-field";
import { MatFormFieldModule as S } from "@angular/material/form-field";
import * as p from "@angular/material/input";
import { MatInputModule as _ } from "@angular/material/input";
import * as l from "@angular/material/radio";
import { MatRadioModule as I } from "@angular/material/radio";
import * as u from "@angular/material/button";
import { MatButtonModule as R } from "@angular/material/button";
var j = (() => { class t {
    total = 0;
    static \u0275fac = function (o) { return new (o || t); };
    static \u0275cmp = e.\u0275\u0275defineComponent({ type: t, selectors: [["vixo-balance-ui"]], inputs: { total: "total" }, decls: 3, vars: 4, consts: [[2, "text-align", "center"]], template: function (o, a) { o & 1 && (e.\u0275\u0275domElementStart(0, "h2", 0), e.\u0275\u0275text(1), e.\u0275\u0275pipe(2, "currency"), e.\u0275\u0275domElementEnd()), o & 2 && (e.\u0275\u0275advance(), e.\u0275\u0275textInterpolate1("Balance: ", e.\u0275\u0275pipeBind2(2, 1, a.total, "MXN"))); }, dependencies: [c], encapsulation: 2 });
} return t; })(), U = (() => { class t {
    data;
    static \u0275fac = function (o) { return new (o || t); };
    static \u0275cmp = e.\u0275\u0275defineComponent({ type: t, selectors: [["vixo-record-modal-ui"]], inputs: { data: "data" }, decls: 10, vars: 9, consts: [["appearance", "outlined", 3, "ngClass"]], template: function (o, a) { o & 1 && (e.\u0275\u0275elementStart(0, "mat-card", 0)(1, "mat-card-header")(2, "mat-card-title-group")(3, "mat-card-title"), e.\u0275\u0275text(4), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(5, "mat-card-subtitle"), e.\u0275\u0275text(6), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(7, "p"), e.\u0275\u0275text(8), e.\u0275\u0275pipe(9, "currency"), e.\u0275\u0275elementEnd()()()()), o & 2 && (e.\u0275\u0275property("ngClass", a.data.type), e.\u0275\u0275advance(4), e.\u0275\u0275textInterpolate(a.data.name), e.\u0275\u0275advance(2), e.\u0275\u0275textInterpolate(a.data.category), e.\u0275\u0275advance(2), e.\u0275\u0275textInterpolate2("", a.data.type === "expense" ? "-" : "", "", e.\u0275\u0275pipeBind3(9, 5, a.data.amount, "MXN", "$"))); }, dependencies: [g, C, M, y, v, f, c], styles: [".income[_ngcontent-%COMP%]{background-color:#90ee90}.expense[_ngcontent-%COMP%]{background-color:#ee4b0aa1}"], changeDetection: 0 });
} return t; })(), X = (() => { class t {
    fb;
    dialogRef = m(D);
    data = m(E);
    formData;
    constructor(i) { this.fb = i, this.formData = this.fb.group({ name: [""], category: [""], amount: [""], type: ["expense"] }); }
    onCancelButtonClick() { this.dialogRef.close(); }
    onAddButtonClick() { this.dialogRef.close(this.formData.value); }
    static \u0275fac = function (o) { return new (o || t)(e.\u0275\u0275directiveInject(n.FormBuilder)); };
    static \u0275cmp = e.\u0275\u0275defineComponent({ type: t, selectors: [["vixo-add-record-form-content-ui"]], decls: 26, vars: 1, consts: [[1, "container-add-record", 3, "formGroup"], [1, "form-group-add-record"], ["matInput", "", "formControlName", "name"], ["matInput", "", "formControlName", "category"], ["floatLabel", "always", 1, "form-group-add-record"], ["matInput", "", "type", "number", "step", "0.1", "placeholder", "0", "formControlName", "amount", 2, "text-align", "end"], ["matTextPrefix", ""], ["formControlName", "type", 1, "form-group-add-record"], ["value", "expense"], ["value", "income"], ["align", "end"], ["mat-button", "", 3, "click"]], template: function (o, a) { o & 1 && (e.\u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 0)(2, "mat-form-field", 1)(3, "mat-label"), e.\u0275\u0275text(4, "Name"), e.\u0275\u0275elementEnd(), e.\u0275\u0275element(5, "input", 2), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(6, "mat-form-field", 1)(7, "mat-label"), e.\u0275\u0275text(8, "Category"), e.\u0275\u0275elementEnd(), e.\u0275\u0275element(9, "input", 3), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(10, "mat-form-field", 4)(11, "mat-label"), e.\u0275\u0275text(12, "Amount"), e.\u0275\u0275elementEnd(), e.\u0275\u0275element(13, "input", 5), e.\u0275\u0275elementStart(14, "span", 6), e.\u0275\u0275text(15, "$\xA0"), e.\u0275\u0275elementEnd()(), e.\u0275\u0275elementStart(16, "mat-radio-group", 7)(17, "mat-radio-button", 8), e.\u0275\u0275text(18, "Expense"), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(19, "mat-radio-button", 9), e.\u0275\u0275text(20, "Income"), e.\u0275\u0275elementEnd()()()(), e.\u0275\u0275elementStart(21, "mat-dialog-actions", 10)(22, "button", 11), e.\u0275\u0275listener("click", function () { return a.onCancelButtonClick(); }), e.\u0275\u0275text(23, "Cancel"), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(24, "button", 11), e.\u0275\u0275listener("click", function () { return a.onAddButtonClick(); }), e.\u0275\u0275text(25, "Add"), e.\u0275\u0275elementEnd()()), o & 2 && (e.\u0275\u0275advance(), e.\u0275\u0275property("formGroup", a.formData)); }, dependencies: [S, r.MatFormField, r.MatLabel, r.MatPrefix, _, p.MatInput, I, l.MatRadioGroup, l.MatRadioButton, x, n.DefaultValueAccessor, n.NumberValueAccessor, n.NgControlStatus, n.NgControlStatusGroup, b, n.FormGroupDirective, n.FormControlName, A, d.MatDialogActions, d.MatDialogContent, R, u.MatButton], styles: [".container-add-record[_ngcontent-%COMP%] > .form-group-add-record[_ngcontent-%COMP%]{display:block}"], changeDetection: 0 });
} return t; })();
export { X as AddRecordContentComponent, U as RecordModalComponent, j as VixoBalanceUI };
