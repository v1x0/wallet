import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceComponent } from './balance.component';

describe('BalanceComponent', () => {
  let fixture: ComponentFixture<BalanceComponent>;

  async function render(total: number): Promise<HTMLElement> {
    fixture.componentRef.setInput('total', total);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement.querySelector('.balance__total') as HTMLElement;
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
  });

  it('shows the total as currency', async () => {
    const total = await render(1234.5);
    expect(total.textContent?.trim()).toBe('$1,234.50');
    expect(total.classList).not.toContain('balance__total--negative');
  });

  it('marks a negative balance', async () => {
    const total = await render(-10);
    expect(total.classList).toContain('balance__total--negative');
  });
});
