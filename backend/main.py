#main
from pandas.core.interchange.from_dataframe import primitive_column_to_ndarray

from bot_controller import start_bot, stop_bot, pause_bot
from bot_state import BotStatus

def menu():
    print("\n=== Almeda Bot Control ===")
    print("1. Start Bot")
    print("2. Pause Bot")
    print("3. Stop Bot")
    print("4. Status")
    print("5. Exit")

def main():
    while True:
        menu()
        choice = input("Enter your choice: ")
        if choice == "1":
            print(start_bot())
        elif choice == "2":
            print(pause_bot())
        elif choice == "3":
            print(stop_bot())
        elif choice == "4":
            print(f"Current State: {BotStatus.get_state().name}")
        elif choice == "5":
            print("Exiting...")
            break
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    main()