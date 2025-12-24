import { test, expect, Page } from '@playwright/test';

test('create game', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Список игр пуст')).toBeVisible();

  await createGame(page);

  // добавляем закупы
  await addBuy(page, 0);
  await addBuy(page, 0);

  // проверяем что у первого игрока появился закуп
  await expect(page.getByTestId('user-buy-sum-0')).toHaveText('закупы 200');

  // вводим остаток на руках
  await setBalance(page, 0, 300);
  await setBalance(page, 1, 100);

  // проверяем что у второго игрока верный итог
  await expect(page.getByTestId('user-result-1')).toHaveText('Итог:  -100');

  // рассчитываем переводы
  await page.getByTestId('calculate-results-button').click();
  await page.waitForSelector(`[data-testid=transactions-list]`, {
    state: 'visible',
  });

  // проверяем корректность переводов
  await expect(page.getByTestId('transactions-list')).toHaveText(
    'Таня 100 Деня'
  );
});

async function createGame(page: Page) {
  await page.getByTestId('add-game-button').click();
  await page.getByTestId('user-name-0').click();
  await page.getByTestId('user-name-1').click();
  //хз нужен ли таймаут, сперва без него не создавалась игра, потом вроде заработало
  // await page.waitForTimeout(10);
  await page.getByTestId('apply-create-game-button').click();
  await page.locator('mat-dialog-container').waitFor({ state: 'hidden' });
}

async function addBuy(page: Page, index: number) {
  await page.waitForSelector(`[data-testid=add-buy-button-${index}]`, {
    state: 'visible',
  });
  await page.getByTestId(`add-buy-button-${index}`).click();
  await page.waitForSelector(`[data-testid=confirm-buy-button]`, {
    state: 'visible',
  });

  await page.getByTestId('confirm-buy-button').click();

  await page.locator('mat-dialog-container').waitFor({ state: 'hidden' });
}

async function setBalance(page: Page, index: number, balance: number) {
  await page.getByTestId(`edit-balance-button-${index}`).click();
  await page.getByTestId(`edit-balance-input`).fill(balance.toString());
  await page.getByTestId(`save-balance-button`).click();
  await page.locator('mat-dialog-container').waitFor({ state: 'hidden' });
}
