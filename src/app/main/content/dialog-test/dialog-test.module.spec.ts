import { DialogTestModule } from './dialog-test.module';

describe('DialogTestModule', () => {
  let dialogTestModule: DialogTestModule;

  beforeEach(() => {
    dialogTestModule = new DialogTestModule();
  });

  it('should create an instance', () => {
    expect(dialogTestModule).toBeTruthy();
  });
});
