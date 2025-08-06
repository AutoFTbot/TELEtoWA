__CHANNEL__ = 'Telegram : @AutoFtBot'

import requests
from bs4 import BeautifulSoup
from colorama import Fore,init
from time import sleep
init()



print (f"""{Fore.CYAN}
   ____     _____     _____              ________    _____   _____      
  (    )   (  __ \\   (_   _)            (___  ___)  / ___/  (_   _)     
  / /\\ \\    ) )_) )    | |    ________      ) )    ( (__      | |       
 ( (__) )  (  ___/     | |   (________)    ( (      ) __)     | |       
  )    (    ) )        | |                  ) )    ( (        | |   __  
 /  /\\  \\  ( (        _| |__               ( (      \\ \\___  __| |___) ) 
/__(  )__\\ /__\\      /_____(               /__\\      \\____\\ \\________/  
                                                                        
    {Fore.YELLOW}AutoFtBot - Tool untuk mendapatkan API Hash dan API ID Telegram
    {Fore.LIGHTGREEN_EX}Git & Telegram : @AutoFtBot\n
""")
Phone = input(f"{Fore.RED}[{Fore.GREEN}+{Fore.RED}] {Fore.GREEN}Masukkan nomor telepon dengan kode negara [Contoh : +6281234567890]: {Fore.RED}")
with requests.Session() as req:
    phone_number = Phone
    
    login0 = req.post('https://my.telegram.org/auth/send_password', data={'phone': phone_number})

    if 'Sorry, too many tries. Please try again later.' in login0.text:
        print(f'{Fore.RED}Akun Anda telah diblokir!\n Silakan coba lagi dalam 8 jam ')
        exit()

    login_data = login0.json()
    random_hash = login_data['random_hash']

    code = input(f'{Fore.RED}[{Fore.GREEN}+{Fore.RED}] {Fore.GREEN}Masukkan kode yang dikirim ke akun Telegram: {Fore.RED}')
    
    login_data = {
        'phone': phone_number,
        'random_hash': random_hash,
        'password': code
    }
    
    login = req.post('https://my.telegram.org/auth/login', data=login_data)
    
    # Check if login was successful
    if 'Sorry, too many tries. Please try again later.' in login.text:
        print(f'{Fore.RED}Login gagal! Terlalu banyak percobaan. Silakan coba lagi nanti.')
        exit()
    
    apps_page = req.get('https://my.telegram.org/apps')
    soup = BeautifulSoup(apps_page.text, 'html.parser')
    
    # Check if we're still on login page (login failed)
    if 'auth/login' in apps_page.url or 'login' in apps_page.text.lower():
        print(f'{Fore.RED}Login gagal! Silakan periksa nomor telepon dan kode Anda.')
        exit()
    
    try:
        # Try different selectors in case HTML structure changed
        api_id_element = soup.find('label', string='App api_id:')
        if not api_id_element:
            api_id_element = soup.find('label', string='api_id:')
        if not api_id_element:
            api_id_element = soup.find('span', string='api_id')
        
        if api_id_element:
            api_id = api_id_element.find_next_sibling('div').select_one('span').get_text()
        else:
            raise Exception("Elemen API ID tidak ditemukan")
            
        api_hash_element = soup.find('label', string='App api_hash:')
        if not api_hash_element:
            api_hash_element = soup.find('label', string='api_hash:')
        if not api_hash_element:
            api_hash_element = soup.find('span', string='api_hash')
            
        if api_hash_element:
            api_hash = api_hash_element.find_next_sibling('div').select_one('span').get_text()
        else:
            raise Exception("Elemen API Hash tidak ditemukan")
            
        key_element = soup.find('label', string='Public keys:')
        if key_element:
            key = key_element.find_next_sibling('div').select_one('code').get_text()
        else:
            key = "Tidak ditemukan"
            
        Pc_element = soup.find('label', string='Production configuration:')
        if Pc_element:
            Pc = Pc_element.find_next_sibling('div').select_one('strong').get_text()
        else:
            Pc = "Tidak ditemukan"
            
        sleep(3)
        print (f"""{Fore.GREEN}
    __    ____  ____ 
    /__\\  (  _ \\(_  _)
    /(__)\\  )___/ _)(_ 
    (__)(__)(__)  (____)

    {Fore.CYAN}API berhasil didapatkan:

        {Fore.RED}[{Fore.GREEN}+{Fore.RED}] {Fore.GREEN}API ID: {Fore.YELLOW}{api_id}
        {Fore.RED}[{Fore.GREEN}+{Fore.RED}] {Fore.GREEN}API HASH: {Fore.YELLOW}{api_hash}
        
        {Fore.RED}[{Fore.GREEN}~{Fore.RED}] {Fore.GREEN}Public Key: {Fore.YELLOW}{key}
        {Fore.RED}[{Fore.GREEN}~{Fore.RED}] {Fore.GREEN}Konfigurasi Produksi: {Fore.YELLOW}{Pc}
        
    """)
    except Exception as e:
        print(f'{Fore.RED}Error: {str(e)}')
        print(f'{Fore.YELLOW}Kemungkinan penyebab:')
        print(f'{Fore.YELLOW}1. Login gagal - periksa nomor telepon dan kode Anda')
        print(f'{Fore.YELLOW}2. Telegram mengubah struktur website mereka')
        print(f'{Fore.YELLOW}3. Akun Anda tidak memiliki akses API')
        print(f'{Fore.YELLOW}4. Rate limiting dari Telegram')
        print(f'{Fore.RED}Silakan coba lagi nanti atau hubungi @AutoFtBot untuk bantuan!')
