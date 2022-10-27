const test_extraction = require('../main');

test('test1', () => {
    const str:string = "掲示差出人：教務課\n掲示開始日時：2022/06/30(木) 00:00\n\n以下の授業を休講します。\n\n授業名：企業と経営　(工学科)\n教員名：山田　太郎\n休講日：07月01日（金）2時限\n\nこのメールは送信専用のメールアドレスから送信しているため、ご返信いただいてもお答えできません。";
    expect(test_extraction(str)).toBe("授業名：企業と経営　(工学科)\n休講日：07月01日（金）2時限\n");
  });

  test('Text not covered', () => {
    const str:string = "Lorem ipsum dolor sit amet dolor nonumy no odio sea facilisis et consetetur diam eum aliquyam aliquyam sed.";
    expect(test_extraction(str)).toBe("");
  });