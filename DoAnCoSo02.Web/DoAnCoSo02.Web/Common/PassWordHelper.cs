using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.Web.Common
{
	public class PassWordHelper
	{
        const string COLLECTION_CHARS = @"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~!@#$%^&*()_-+={[}]\|;:""\'<,>.?/abcdefghijklmnopqrstuvwxyzđáàảãạăắằẵẳặâấầẩẫậíìỉĩịúùủũụéèẻẽẹêếềễểệóòỏõọôốồổỗộơớờởỡợưứừửữựýỳỷỹỵĐÁÀẢÃẠĂẮẰẴẲẶÂẤẦẨẪẬÍÌỈĨỊÚÙỦŨỤÉÈẺẼẸÊẾỀỄỂỆÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢƯỨỪỬỮỰÝỲỶỸỴƵƶẐẑĎďĆćĈĉČčḨḩḤḥḪḫṰṱṮṯŦŧȾⱦț";
        public static string MD5Hash(string text)
        {
            MD5 md5 = new MD5CryptoServiceProvider();
            md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(text));
            byte[] result = md5.Hash;
            StringBuilder strBuilder = new StringBuilder();
            for (int i = 0; i < result.Length; i++)
            {
                strBuilder.Append(result[i].ToString("x2"));
            }
            return strBuilder.ToString();
        }
        public static string CreateSalt(int min, int max)
        {
            Random rand = new Random();
            char[] salt = new char[rand.Next(min, max)];
            for (int i = 0; i < salt.Length; i++)
            {
                salt[i] = COLLECTION_CHARS[rand.Next(COLLECTION_CHARS.Length)];
            }

            string result = new String(salt);
            return result;
        }
        public static string EncryptSHA512(string plainText, string salt = "")
        {
            var sha512Hash = new SHA512Managed();
            string mixedPassword = plainText + salt + salt.Length.ToString();
            byte[] crypto = sha512Hash.ComputeHash(Encoding.UTF8.GetBytes(mixedPassword));
            string encodedPassword = string.Empty;
            foreach (byte theByte in crypto)
            {
                encodedPassword += COLLECTION_CHARS[(int)theByte % COLLECTION_CHARS.Length];
            }
            return encodedPassword;
        }
    }
}
